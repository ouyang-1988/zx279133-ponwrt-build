include $(TOPDIR)/rules.mk

LUCI_TITLE:=EasyTier mesh VPN control
LUCI_DEPENDS:=+easytier +luci-base +luci-mod-system +luci-mod-network +luci-mod-status +rpcd-mod-ucode +ucode-mod-fs
LUCI_PKGARCH:=all
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
CONFIG_LUCI_CSSTIDY:=

include $(TOPDIR)/feeds/luci/luci.mk

# This app is written for the 25.12 JS/ucode LuCI: no luasrc/, no CBI and no
# luci-compat dependency. Upstream EasyTier/luci-app-easytier is Lua/CBI and
# would drag luci-lua-runtime and lua into the image for no functional gain.
