pkg_name=census-proxy
pkg_origin=predominant
pkg_version=0.1.0
pkg_maintainer="Graham Weldon <graham@grahamweldon.com>"
pkg_license=("GPL-3.0-or-later")
pkg_description="A simple CORS proxy"
pkg_upstream_url="https://grahamweldon.com"
pkg_deps=(core/nginx)
pkg_svc_run="nginx -c ${pkg_svc_config_path}/nginx.conf"
pkg_exports=(
  [port]=port
)
pkg_exposes=(port)
pkg_svc_user="root"
pkg_svc_group="root"

do_build() {
  return 0
}

do_install() {
  return 0
}
