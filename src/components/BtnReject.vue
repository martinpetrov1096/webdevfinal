<template>
    <div :class="{'vis': visible}" id="btnReject" class="btn"></div>
</template>

<script>

export default {
    name: "BtnReject",
    props: {
        visible: Boolean
    }
}
</script>
<style scoped>
.btn {
    width: 100px;
    height: 100px;
    outline: none;
    border: none;
    border-radius: 100%;  
    background: url("~@/assets/icons/rejectButton.svg");
    background-repeat: no-repeat;
    opacity: 0;
}

.vis {
    opacity: 1;
}
</style>