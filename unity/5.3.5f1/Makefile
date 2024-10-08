include ../common.mk

UNITY_LINKER := $(MONO) $(EDITOR_DIR)/Data/Tools/UnusedBytecodeStripper.exe
IL2CPP := $(MONO) $(IL2CPP_DIR)/build/il2cpp.exe

MSCORLIB := $(MONO_DIR)/lib/mono/2.0/mscorlib.dll

export TERM = xterm

ASSEMBLY_TARGET_CMD = $(IL2CPP) \
	--compile-cpp \
	--libil2cpp-static \
	--configuration=Release \
	--platform=Linux \
	--architecture=x64 \
	--dotnetprofile=net20 \
	--cachedirectory="$(@D)/.." \
	--generatedcppdir="$(<D)" \
	--outputpath="$@"

CPP_TARGET_CMD = $(IL2CPP) \
	--convert-to-cpp \
	--emit-null-checks \
	--enable-array-bounds-check \
	--copy-level=None \
	--dotnetprofile=net20 \
	--assembly="$^" \
	--generatedcppdir="$(@D)"

LINKED_DLL_TARGET_CMD = $(UNITY_LINKER) \
	-l none \
	-b false \
	-c link \
	-x "$(LINKER_DESCRIPTORS_DIR)/mscorlib.xml" \
	-a "$(MSCORLIB)" \
	-a "$<" \
	-out "$(@D)"

$(EDITOR_DIR):
ifneq "$(call TEST_EDITOR)" "YES"
	@ $(ECHO) downloading editor...
	@ curl -L -s -A "" --fail "http://download.unity3d.com/download_unity/linux/unity-editor-5.3.5f1+20160525_amd64.deb" -o editor.deb

	@ $(ECHO) extracting editor...
	@ ar x editor.deb
	@ tar -xf data.tar.gz --strip-components=3 --exclude="usr*" --exclude="opt/Unity/MonoDevelop*"

	@ ar t editor.deb | xargs rm
	@ rm editor.deb
	@ touch -m Editor
endif
