<template>
        <div class="container col-sm-3" role="main">
<sweet-modal id="sp" ref="modal" blocking hide-close-button overlay-theme="dark"> 
    <!-- Modal content-->
      <div class="modal-body" style="text-align:left">
                        <div class="panel panel-default box-shadow">
                    <div class="panel-body">
                        <section class="payment-form dark" style="border-radius:5px">
                            <center style="margin-top:-50px">
                                <img v-bind:src="merchant.image" style="width:160px">
                                </br>
                                </br>Payment to <b>{{ merchant.name }}</b>
                            </center>
                            <hr>
                            <element-loading :active="loading" spinner="spinner" color="#FF6700"/>
                            <router-view />
                        </section>
                        </main>
                    </div>
                </div>
      </div>
      <hr style="border-top:1px solid rgba(0, 0, 0, 0.1);margin:0px">
      <div class="stellarpay-footer row justify-content-center">
            <a href="https://stellarpay.io" target="_blank" style="text-decoration:none;">
            <span style="font-weight:400;font-size:20px;color:black">StellarPay | Checkout</span>
            </a>
      </div>
    </sweet-modal>
        </div>
</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery
    import ElementLoading from 'vue-element-loading'
    import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
    export default {
        components: {
          ElementLoading,
          SweetModal,
		  SweetModalTab
        },
        data() {
            return {
                activeTab: '',
                user: {},
                item: {
                    name: ''
                },
                merchant: {
                    name: '',
                    id: '',
                    image: '',
                    acceptedCurrencies: {}
                },
                login: {
                    username: '',
                    password: ''
                },
                active_currency: {
                    code: '',
                    rate: '',
                    issuer: '',
                    calculated: ''
                },
                order: {},
                step: 'overview',
                isGuest: '',
                error: '',
                message: '',
                countDownMessage: '',
                fetchOrder: {},
                api_server: 'https://api.stellarpay.io',
                xlm_prices: {},
                currency: '',
                shopifyCurrencies: ["native_usd","native_eur","native_gbp","native_jpy","native_cad","native_sgd","native_hkd","native_dkk","native_nzd"],
                initial: {
                    rate: '',
                    xlm_amount: ''
                },
                loading: true
            }
        },
        created() {
            this.activeTab = this.$route.name
            this.switchTab('overview')
                
            this.axios.get(this.api_server + '/api/merchantDetails/' + StellarPay.apiKey).then(response => {
                this.merchant.name = response.data.result[0].merchantLabel
                this.merchant.id = response.data.result[0].merchantId
                this.merchant.image = response.data.result[0].merchantLogo
                this.merchant.success = response.data.result[0].successUrl
                this.merchant.cancel = response.data.result[0].cancelUrl
                this.merchant.acceptedCurrencies = JSON.parse(response.data.result[0].acceptedCurrencies)
            })
            
            this.checkShopifyStatus();
        },
        mounted() {
            $(".generated_icon").click(function() {
                $(".generated_icon").removeClass("active");
                $(this).addClass("active");
            });
            this.$refs.modal.open('sp')
        },
        methods: {
            switchTab(tab) {
                    this.$router.push({
                        name: tab
                    })
                },
                checkXLMPriceAndCalculate() {
                    var prefix = this
                    this.axios.get(prefix.api_server + '/cached_info/price.json').then(response => {
                        prefix.xlm_prices = response.data

                        if(Shopify.currency == 'USD'){
                            prefix.xlm_prices.xlm_usd -= prefix.xlm_prices.xlm_usd * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_usd;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else if(Shopify.currency == 'EUR'){
                            prefix.xlm_prices.xlm_eur -= prefix.xlm_prices.xlm_eur * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_eur;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        } 
                        else if(Shopify.currency == 'GBP'){
                            prefix.xlm_prices.xlm_gbp -= prefix.xlm_prices.xlm_gbp * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_gbp;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else if(Shopify.currency == 'JPY'){
                            prefix.xlm_prices.xlm_jpy -= prefix.xlm_prices.xlm_jpy * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_jpy;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else if(Shopify.currency == 'CAD'){
                            prefix.xlm_prices.xlm_cad -= prefix.xlm_prices.xlm_cad * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_cad;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else if(Shopify.currency == 'SGD'){
                            prefix.xlm_prices.xlm_sgd -= prefix.xlm_prices.xlm_sgd * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_sgd;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else if(Shopify.currency == 'HKD'){
                            prefix.xlm_prices.xlm_hkd -= prefix.xlm_prices.xlm_hkd * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_hkd;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else if(Shopify.currency == 'DKK'){
                            prefix.xlm_prices.xlm_dkk -= prefix.xlm_prices.xlm_dkk * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_dkk;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else if(Shopify.currency == 'NZD'){
                            prefix.xlm_prices.xlm_nzd -= prefix.xlm_prices.xlm_nzd * (0.5 / 100);
                            this.initial.rate = prefix.xlm_prices.xlm_nzd;
                            this.initial.xlm_amount = Shopify.total_price/this.initial.rate;
                        }
                        else{

                        }
                        this.loading = false

                    })
                },
                checkShopifyStatus() {
                    var prefix = this
                    this.axios.get(prefix.api_server + '/api/isProcessedOnShopify/' + Shopify.order_id).then(response => {
                        prefix.fetchOrder = response.data.result[0]
                        prefix.loading = false
                        if (prefix.fetchOrder.isExpired == true && prefix.fetchOrder.orderStatus == false) {
                            this.$router.push({
                                    name: 'expired'
                            })
                        } else if (prefix.fetchOrder.orderStatus == true) {
                            this.$router.push({
                                    name: 'paid'
                            })
                        } else {
                        }
                    })
                },
                countDown(duration, display) {
                  var timer = duration,
                      minutes, seconds;
                  var current = this
                  var prefix = this
                  setInterval(function() {
                      minutes = parseInt(timer / 60, 10)
                      seconds = parseInt(timer % 60, 10);

                      minutes = minutes < 10 ? "0" + minutes : minutes;
                      seconds = seconds < 10 ? "0" + seconds : seconds;

                      display.textContent = minutes + ":" + seconds;

                      if (--timer < 0) {
                          if (prefix.fetchOrder.isExpired == true && prefix.fetchOrder.orderStatus == false) {
                              //prefix.countDownMessage = 'expired'
                          }
                      }
                  }, 1000);
              },
                    openFullscreen() {
                        var elem = document.documentElement;
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                        elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                        elem.msRequestFullscreen();
                    }
                    }
        },
        watch: {
            '$route.name' () {
                this.activeTab = this.$route.name
            }
        }
    }
</script>
<style>
.sweet-modal{
    border-radius: 0px;
}
.sweet-modal .sweet-buttons, .sweet-modal .sweet-content{
    padding: initial
}
.sweet-modal.is-alert .sweet-content{
    padding-bottom: 10px
}
</style>