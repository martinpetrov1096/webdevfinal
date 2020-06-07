<template>
    <div :class="{'hidden': !visible}" id="btnReject" class="btn"></div>
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
    transition: all 2s ease-out;
}

.hidden {
    opacity: 0;
}
</style>