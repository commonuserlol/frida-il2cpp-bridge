MAKEFLAGS += --no-builtin-rules

VER_GTE = $(shell printf '%s\n' "$2" "$1" | sort -C -V && echo YES || echo NO)
TEST_EDITOR = $(shell if [ -d '$(EDITOR_DIR)' ]; then echo YES; fi)

THIS_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
ROOT_DIR := $(shell realpath $(THIS_DIR)/../..)
UNITY_VERSION := $(shell basename $(THIS_DIR))
BUILD_DIR = $(ROOT_DIR)/build/$(UNITY_VERSION)
EDITOR_DIR = $(THIS_DIR)/Editor

MONO_DIR = $(EDITOR_DIR)/Data/Mono
MONOBL_DIR = $(EDITOR_DIR)/Data/MonoBleedingEdge
IL2CPP_DIR = $(EDITOR_DIR)/Data/il2cpp

MONO := $(MAYBE_STRACE) $(MONOBL_DIR)/bin/mono
MCS := $(MONO) $(MONOBL_DIR)/lib/mono/4.5/mcs.exe

LINKER_DESCRIPTORS_DIR := $(IL2CPP_DIR)/LinkerDescriptors

ifeq "$(call VER_GTE,$(UNITY_VERSION),2019.1.0f1)" "YES"
GENERATED_CPP_FILENAME := %
else
GENERATED_CPP_FILENAME := Bulk_%_0
endif

ASSEMBLY_TARGET := $(BUILD_DIR)/out/%.so
CPP_TARGET := $(BUILD_DIR)/cpp/$(GENERATED_CPP_FILENAME).cpp
LINKED_DLL_TARGET := $(BUILD_DIR)/linked/%.dll
DLL_TARGET := $(BUILD_DIR)/dll/%.dll
CS_SRC := $(ROOT_DIR)/test/%.cs

ECHO := echo -e "\e[1;34m$(UNITY_VERSION)\e[0m ►"
CURL := curl -L -s -A "" --fail

test_mono:
	@ $(call $(MONO))
ifneq "$(.SHELLSTATUS)" "1"
	@ $(ECHO) using system-provided mono
MONO := $(MAYBE_STRACE) mono
MCS := mcs
endif

$(ASSEMBLY_TARGET): $(CPP_TARGET)
	@ $(ECHO) compiling $(<F)
	@ $(ASSEMBLY_TARGET_CMD)
	@ strip "$@"

$(CPP_TARGET): $(LINKED_DLL_TARGET)
	@ $(ECHO) generating $(@F)
	@ $(CPP_TARGET_CMD)

$(LINKED_DLL_TARGET): $(DLL_TARGET)
	@ $(ECHO) linking $(<F)
	@ $(LINKED_DLL_TARGET_CMD)
	@ touch "$@"

$(DLL_TARGET): $(CS_SRC) $(EDITOR_DIR) $(BUILD_DIR)
	@ $(test_mono)
	@ $(ECHO) compiling $(<F)
	@ mkdir -p "$(@D)"
	@ $(DLL_TARGET_CMD)

$(BUILD_DIR):
	@ mkdir -p "$@"

download_using_changeset:
ifneq "$(call TEST_EDITOR)" "YES"
	@ $(ECHO) downloading editor...
	@ $(CURL) https://download.unity3d.com/download_unity/$(UNITY_CHANGESET)/LinuxEditorInstaller/Unity-$(UNITY_VERSION).tar.xz -o Unity.tar.xz

	@ $(ECHO) extracting editor...
	@ tar -xf Unity.tar.xz
	@ touch -m Editor

	@ rm Unity.tar.xz

ifeq "$(call VER_GTE,$(UNITY_VERSION),2019.4.0f1)" "YES"
	@ $(ECHO) downloading editor support...
	@ $(CURL) https://download.unity3d.com/download_unity/$(UNITY_CHANGESET)/LinuxEditorTargetInstaller/UnitySetup-Linux-IL2CPP-Support-for-Editor-$(UNITY_VERSION).tar.xz -o Support.tar.xz

	@ $(ECHO) extracting editor support...
	@ tar -xf Support.tar.xz
	@ touch -m Editor
	
	@ rm Support.tar.xz
endif
endif

.PHONY: download_using_changeset

DLL_TARGET_CMD ?= $(MCS) \
	-target:library \
	-nologo \
	-noconfig \
	-unsafe \
	-out:"$@" \
	"$<"

.PHONY: assembly
assembly: $(BUILD_DIR)/out/GameAssembly.so

# USED_FILE_LIST := $(BUILD_DIR)/filelist.txt
# .PHONY: minimalize
# minimalize: MAYBE_STRACE := strace -z -o "$(BUILD_DIR)/filelist.txt" -A -e trace=file
# minimalize: | clean assembly
# 	@ grep -oP '$(EDITOR_DIR)/[^"]+' "$(USED_FILE_LIST)" | sort -u | sed -E 's#/+#/#g' > "$(USED_FILE_LIST).sorted"
# 	@ find "$(EDITOR_DIR)" -type f -not -path "$(EDITOR_DIR)/Data/il2cpp/*" -print0 | grep -zFxvf "$(USED_FILE_LIST).sorted" | xargs -0 rm
# 	@ find "$(EDITOR_DIR)" -type d -empty -delete

.PHONY: clean
clean:
	@ rm -rf "$(BUILD_DIR)"

.SECONDARY:
