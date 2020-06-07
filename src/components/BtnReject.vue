<template>
    <div :class="{'vis': visible}" id="btnReject" class="btn"></div>
</template>

<script>

import "@/assets/css/btn.css";
export default {
    name: "BtnReject",
    props: {
        visible: Boolean
    }
}
</script>
<style scoped>
.btn {
    background: url("~@/assets/icons/rejectButton.svg");
    background-repeat: no-repeat;
    opacity: 0;
}

.vis {
    opacity: 1;
}
</style>