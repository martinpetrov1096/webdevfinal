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

    background: url("https://cdn.glitch.com/f885813f-4542-461e-9e2c-c21e4f424ee4%2FheartButton.1f05d0b6.svg?v=1591586129623");
    background-repeat: no-repeat;
    transition: all .2s ease-out;
}
.hidden {
    opacity: 0;
}

</style>