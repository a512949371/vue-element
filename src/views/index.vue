<template>
  <div class="viewFramework">
    <topbar></topbar>
    <div class="viewFrame-content">
      <sidebar></sidebar>
      <div class="section-content">
        <breadcrumb></breadcrumb>
        <main class="section-main">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>
<script>
import topbar from "../components/nav/topbar/topbar";
import sidebar from "../components/nav/siderbar/sidebar";
import breadcrumb from "../components/nav/breadcrumb";

export default {
  components: {
    topbar,
    sidebar,
    breadcrumb
  },
};
</script>
<style lang="scss">
.viewFramework {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .viewFrame-content {
    display: flex;
    height: calc(100% - 72px);
    .section-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      .section-main {
        flex: 1;
        overflow-y: auto;
      }
    }
  }
}
</style>
