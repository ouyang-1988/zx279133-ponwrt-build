include $(TOPDIR)/rules.mk

LUCI_TITLE:=EasyTier mesh VPN control
LUCI_DEPENDS:=+luci-base +rpcd-mod-ucode +ucode-mod-fs
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
# +easytier is deliberately absent from LUCI_DEPENDS: this package is
# LUCI_PKGARCH=all while easytier is built for aarch64_cortex-a53, and an
# all-arch package that depends on a target-arch package is dropped by
# make defconfig without a word. Both are selected explicitly by
# scripts/configure-sk-d840n.sh, which asserts the outcome instead of the
# intent. The app itself only needs ubus/rpcd and /etc/init.d/easytier.
#
# luci-mod-system/-network/-status are likewise absent: the view uses only what
# luci-base provides (form.Map/NamedSection, rpc.declare, callLuci*).