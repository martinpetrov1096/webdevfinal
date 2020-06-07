<template>
    <div :class="{'hidden': !visible}" id="btnHeart" class="btn"></div>
</template>

<script>
import "@/assets/css/btn.css";
export default {
    name: "BtnHeart",
    props: {
        visible: Boolean
    }
}
</script>

<style scoped>
.btn {
    background: url("~@/assets/icons/heartButton.svg");
    background-repeat: no-repeat;
        transition: all .2s ease-out;
}
.hidden {
    opacity: 0;
}

</style>