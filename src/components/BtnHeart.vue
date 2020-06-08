<template>
    <div :class="{'hidden': !visible}" id="btnHeart" class="btn"></div>
</template>

<script>
export default {
    name: "BtnHeart",
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

    background: url("~@/assets/icons/heartButton.svg");
    background-repeat: no-repeat;
    transition: all .2s ease-out;
}
.hidden {
    opacity: 0;
}

</style>