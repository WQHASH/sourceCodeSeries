<template>
  <div>
      <admin-dashboard></admin-dashboard>
  </div>
</template>
<script>
import adminDashboard from "./admin/index";
export default {
  name: "dashboard",
  components: {
    adminDashboard
  }
};
</script>
