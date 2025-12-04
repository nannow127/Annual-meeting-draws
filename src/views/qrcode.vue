<template>
  <div>
    <div class="item-pic" id="qrinvitecode"></div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2';
export default {
  name: 'App',

  components: {},

  created() {},
  data() {
    return { qrcode: null };
  },
  mounted() {
    this.initQrCode();
    // this.generateQRCode();
  },
  methods: {
    initQrCode() {
      this.qrcode = new QRCode('qrinvitecode', {
        text: 'http://172.22.74.11:8080/#/visitor',
        render: 'canvas',
        width: 150,
        height: 150
      });
    }
  }
};
</script>
<style lang="scss"></style>
