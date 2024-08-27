include ../common.mk

UNITY_CHANGESET := becced5a802b
UNITY_LINKER := DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1 $(IL2CPP_DIR)/build/deploy/netcoreapp3.1/UnityLinker
IL2CPP := DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1 $(IL2CPP_DIR)/build/deploy/netcoreapp3.1/il2cpp

MSCORLIB := $(MONOBL_DIR)/lib/mono/unityaot/mscorlib.dll

export TERM = xterm

ASSEMBLY_TARGET_CMD = $(IL2CPP) \
	--compile-cpp \
	--libil2cpp-static \
	--configuration=Release \
	--platform=Linux \
	--architecture=x64 \
	--dotnetprofile=unityaot \
	--cachedirectory="$(@D)/../buildstate" \
	--generatedcppdir="$(<D)" \
	--baselib-directory="$(EDITOR_DIR)/Data/PlaybackEngines/LinuxStandaloneSupport/Variations/linux64_headless_nondevelopment_il2cpp/" \
	--outputpath="$@"

CPP_TARGET_CMD = $(IL2CPP) \
	--convert-to-cpp \
	--emit-null-checks \
	--enable-array-bounds-check \
	--copy-level=None \
	--dotnetprofile=unityaot \
	--directory="$(<D)" \
	--generatedcppdir="$(@D)"

LINKED_DLL_TARGET_CMD = $(UNITY_LINKER) \
	--i18n=none \
	--silent \
	--core-action=link \
	--strip-security \
	--rule-set=aggressive \
	--dotnetruntime=il2cpp \
	--dotnetprofile=unityaot \
	--descriptor-directory="$(LINKER_DESCRIPTORS_DIR)" \
	--include-assembly="$<,$(MSCORLIB)" \
	--out="$(@D)"

$(EDITOR_DIR): download_using_changeset
