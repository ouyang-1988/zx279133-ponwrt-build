include $(TOPDIR)/rules.mk
-include $(dir $(lastword $(MAKEFILE_LIST)))../version.mk

PKG_NAME:=easytier
PKG_VERSION:=$(or $(EASYTIER_VERSION),2.7.0)
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk

RSTRIP:=:

define Package/$(PKG_NAME)
	SECTION:=net
	CATEGORY:=Network
	TITLE:=A simple, decentralized mesh VPN with WireGuard support.
	DEPENDS:=@(x86_64||arm||aarch64||mipsel||mips)
	URL:=https://github.com/EasyTier/EasyTier
	MENU:=1
endef

define Package/$(PKG_NAME)/description
  A simple, decentralized mesh VPN with WireGuard support.

  Static aarch64 binaries for 2.7.0 are shipped in files/, so the build never
  reaches github.com. CONFIG_TUN is built into this target's kernel, so there is
  no kmod-tun dependency: devtmpfs creates /dev/net/tun as soon as the built-in
  tun driver initialises.
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	$(CP) ./files/* $(PKG_BUILD_DIR)/
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(CP) $(PKG_BUILD_DIR)/easytier-core $(1)/usr/bin/
	chmod 0755 $(1)/usr/bin/easytier-core
	$(CP) $(PKG_BUILD_DIR)/easytier-cli $(1)/usr/bin/
	chmod 0755 $(1)/usr/bin/easytier-cli
	$(CP) $(PKG_BUILD_DIR)/easytier-web-embed $(1)/usr/bin/easytier-web
	chmod 0755 $(1)/usr/bin/easytier-web
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
