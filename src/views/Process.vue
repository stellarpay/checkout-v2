<template>
    <div class="container">
        <div class="title-second">Payment Waiting | <span id="time">60:00</span></div>
        <hr>
                <div>
                    <div class="col-col-sm-3">
                        <p>
                            <center><img :src="'https://chart.googleapis.com/chart?chs=130x130&chld=M%7C0&cht=qr&chl='+''+order.paymentAddress"></center>
                            <div class="title-second" v-if="shopifyCurrencies.includes(active_currency.code)">XLM Amount : </div>
                            <div class="title-second" v-else><b><a :href="'https://stellarchain.io/address/' + active_currency.issuer" target="_blank" style="font-size:13px;color:grey">{{active_currency.code }}</a></b> Amount :</div>
                            <div class="input-group input-group-lg">
                            <input type="text" class="form-control" :value="order.orderAmount" aria-describedby="basic-addon2" disabled>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" v-clipboard="order.orderAmount" type="button">Copy</button>
                            </div>
                            </div>
                            <br>
                            <div class="title-second">ADDRESS :</div>
                            <div class="input-group input-group-lg">
                            <input type="text" class="form-control" :value="order.paymentAddress" aria-describedby="basic-addon2" disabled>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" v-clipboard="order.paymentAddress" type="button">Copy</button>
                            </div>
                            </div>
                            <br>
                            <div class="title-second">MEMO :</div>
                            <div class="input-group input-group-lg">
                            <input type="text" class="form-control" :value="order.memo" aria-describedby="basic-addon2" disabled>
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" v-clipboard="order.memo" type="button">Copy</button>
                            </div>
                            </div>
                            </br>
                        </p>
                    </div>
                </div>
         <div class="form-group col-sm-12">
            <button type="button" style="height:60px" class="btn btn-warning btn-block" @click="openWallet">Pay with Stellar Wallet</button>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            merchant() {
                return this.$parent.$parent.merchant;
            },
            initial() {
                return this.$parent.$parent.initial;
            },
            error() {
                return this.$parent.$parent.error;
            },
            message() {
                return this.$parent.$parent.message;
            },
            active_currency() {
                return this.$parent.$parent.active_currency;
            },
            currency() {
                return this.$parent.$parent.payment.currency;
            },
            order() {
                return this.$parent.$parent.order;
            },
            shopifyCurrencies() {
                return this.$parent.$parent.shopifyCurrencies;
            },
            Shopify() {
                return Shopify;
            }
        },
        mounted(){
            var minutes = 60 * 60,
            display = document.querySelector('#time');
            this.$parent.$parent.countDown(minutes, display);
        },
        methods: {
            shortIt(string, length) {
                var maxLength = length;
                var result = string.substring(0, maxLength) + '...';
                return result
            },
            openWallet(){
                window.open('web+stellar:pay?destination='+this.order.paymentAddress+'&amount='+this.order.orderAmount+'&memo='+this.order.memo+'&msg='+'Payment to '+this.merchant.name, "_system");  
            }
        }
    }
</script>