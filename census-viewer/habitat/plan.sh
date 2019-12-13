pkg_name=census-viewer
pkg_origin=grahamweldon
pkg_version=0.1.0
pkg_maintainer="Graham Weldon <graham@grahamweldon.com"
pkg_license=("GPL-3.0-or-later")
pkg_description="A census viewer for Biome and Habitat"
pkg_upstream_url="https://grahamweldon.com"
pkg_build_deps=(
  core/node
  core/yarn
)
pkg_deps=(
  core/coreutils
  core/nginx
)
pkg_svc_run="nginx -c ${pkg_svc_config_path}/nginx.conf"
pkg_svc_user="root"
pkg_exports=(
  [port]=port
)
pkg_exposes=(port)
pkg_binds_optional=(
  [api]="port"
)

do_build() {
  yarn install
  fix_interpreter "node_modules/.bin/*" core/coreutils bin/env
  yarn build
}

do_install() {
  cp -r build "${pkg_prefix}/"
}
