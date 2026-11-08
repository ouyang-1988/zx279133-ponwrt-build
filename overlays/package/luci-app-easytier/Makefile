include $(TOPDIR)/rules.mk

LUCI_TITLE:=EasyTier mesh VPN control
LUCI_DEPENDS:=+easytier +luci-base +rpcd-mod-ucode +ucode-mod-fs
LUCI_PKGARCH:=all
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
CONFIG_LUCI_CSSTIDY:=

include $(TOPDIR)/feeds/luci/luci.mk

# This app is written for the 25.12 JS/ucode LuCI: no luasrc/, no CBI and no
# luci-compat dependency. Upstream EasyTier/luci-app-easytier is Lua/CBI and
# would drag luci-lua-runtime and lua into the image for no functional gain.
#
# luci-mod-system/-network/-status are deliberately absent from LUCI_DEPENDS.
# They were there at first and the package was dropped by `make defconfig`
# without a word - a package whose dependency cannot be satisfied is removed
# from .config silently, and the reason the configure script asserts the
# outcome instead of the intent is exactly this class of loss.  The view uses
# only what luci-base provides (form.Map/NamedSection, rpc.declare, callLuci*),
# so those three modules are something the image gets from elsewhere or not at
# all, and nothing in this app needs them.
