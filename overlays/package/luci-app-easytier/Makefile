include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-easytier
PKG_VERSION:=1.0.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

LUCI_TITLE:=EasyTier mesh VPN control
LUCI_DEPENDS:=+luci-base +rpcd-mod-ucode +ucode-mod-fs +easytier
LUCI_PKGARCH:=$(ARCH_PACKAGES)

include $(TOPDIR)/feeds/luci/luci.mk

# This app is written for the 25.12 JS/ucode LuCI: no luasrc/, no CBI and no
# luci-compat dependency. Upstream EasyTier/luci-app-easytier is Lua/CBI and
# would drag luci-lua-runtime and lua into the image for no functional gain.
#
# LUCI_PKGARCH is pinned to $(ARCH_PACKAGES) on purpose. luci.mk defaults to
# all, and an all-arch package that DEPENDS on a target-arch package
# (+easytier) is dropped by defconfig in silence - that is what the
# easytier drop actually was. diag-easytier.yml and diag-easytier2.yml pin
# this down: easytier survives, luci-app-easytier does not, and neither does
# a minimal luci-app-* with only +luci-base.

# luci-mod-system/-network/-status stay out of LUCI_DEPENDS: the view uses
# only luci-base (form.Map/NamedSection, rpc.declare, callLuci*).
