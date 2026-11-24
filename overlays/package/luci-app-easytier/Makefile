include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-easytier
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

LUCI_TITLE:=EasyTier mesh VPN control
LUCI_DEPENDS:=+luci-base +rpcd-mod-ucode +ucode-mod-fs +easytier
LUCI_PKGARCH:=all

include $(TOPDIR)/feeds/luci/luci.mk

# This app is written for the 25.12 JS/ucode LuCI: no luasrc/, no CBI and no
# luci-compat dependency. Upstream EasyTier/luci-app-easytier is Lua/CBI and
# would drag luci-lua-runtime and lua into the image for no functional gain.
#
# luci-mod-system/-network/-status stay out of LUCI_DEPENDS: the view uses
# only luci-base (form.Map/NamedSection, rpc.declare, callLuci*).

# call BuildPackage - OpenWrt buildroot scan signature
