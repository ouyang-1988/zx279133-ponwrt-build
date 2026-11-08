include $(TOPDIR)/rules.mk

PKG_NAME:=easytier
PKG_VERSION:=2.6.4
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk

define Package/easytier
  SECTION:=net
  CATEGORY:=Network
  TITLE:=EasyTier 2.6.4 mesh VPN (prebuilt static aarch64)
  URL:=https://github.com/EasyTier/EasyTier
  DEPENDS:=@(aarch64||arm64)
endef

define Package/easytier/description
  EasyTier mesh VPN core and CLI, shipped as the official v2.6.4 static
  aarch64 binaries. TUN/TAP is built into this target's kernel (CONFIG_TUN=y),
  so there is no kmod-tun dependency and no /dev/net/tun helper needed.
endef

define Package/easytier/conffiles
/etc/config/easytier
/etc/easytier/config.toml
endef

# The ELFs under files/ are the upstream release binaries, copied verbatim.
# No PKG_SOURCE/PKG_HASH and no download step: the build never touches the
# network, and PKG_HASH:=skip is gone because skip silences the only check
# that would have noticed a corrupted ELF.
define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	$(CP) ./files/* $(PKG_BUILD_DIR)/
endef

define Build/Compile
endef

# Already stripped and statically linked; a strip step would corrupt them.
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
[ -n "$${IPKG_INSTROOT}" ] || /etc/init.d/easytier enable
exit 0
endef

$(eval $(call BuildPackage,easytier))