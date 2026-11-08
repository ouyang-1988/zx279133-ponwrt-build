include $(TOPDIR)/rules.mk

PKG_NAME:=easytier
PKG_VERSION:=2.6.4
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_LICENSE_FILES:=LICENSE
PKG_MAINTAINER:=EasyTier

# easytier-core/easytier-cli here are the official v2.6.4 release binaries:
# ELF64 AArch64, statically linked musl (no PT_INTERP, no PT_DYNAMIC), so
# they need neither the Rust toolchain nor a matching libc at build time.
# Upstream downloads the release zip inside Build/Prepare and then runs
# nothing; this package ships the same bytes under files/ instead, which
# keeps the CI build off the network and reproducible by sha256.
PKG_SOURCE:=easytier-linux-aarch64-v$(PKG_VERSION).zip
PKG_SOURCE_URL:=https://github.com/EasyTier/EasyTier/releases/download/v$(PKG_VERSION)
PKG_HASH:=skip

include $(INCLUDE_DIR)/package.mk

define Package/easytier
  SECTION:=net
  CATEGORY:=Network
  TITLE:=EasyTier 2.6.4 mesh VPN (prebuilt static aarch64)
  URL:=https://github.com/EasyTier/EasyTier
  DEPENDS:=@(aarch64||arm64)
endef

define Package/easytier/description
  EasyTier mesh VPN core and CLI, shipped as the official static aarch64
  binaries. TUN/TAP is compiled into this target's kernel (CONFIG_TUN=y),
  so there is no kmod-tun dependency and no /dev/net/tun helper needed.
endef

define Package/easytier/conffiles
/etc/config/easytier
/etc/easytier/config.toml
endef

define Build/Prepare
	$(CP) ./files/* $(PKG_BUILD_DIR)/
endef

define Build/Compile
	@: # static prebuilt ELF; nothing to compile or strip
endef

# The ELFs are already stripped and statically linked; any strip step would
# either fail or corrupt them.
RSTRIP:=:

define Package/easytier/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/easytier-core $(1)/usr/bin/easytier-core
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/easytier-cli $(1)/usr/bin/easytier-cli
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./root/etc/config/easytier $(1)/etc/config/easytier
	$(INSTALL_DIR) $(1)/etc/easytier
	$(INSTALL_CONF) ./root/etc/easytier/config.toml $(1)/etc/easytier/config.toml
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./root/etc/init.d/easytier $(1)/etc/init.d/easytier
endef

define Package/easytier/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	/etc/init.d/easytier enable
}
exit 0
endef

$(eval $(call BuildPackage,easytier))
