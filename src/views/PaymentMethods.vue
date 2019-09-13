<template>
    <div class="container card-details">
        <div class="title-second">Payment Methods</div>
        <hr>
        <div class="row justify-content-center">
            <div v-if="error" class="alert alert-danger alert-dismissable">
                {{ error }}
            </div>
            <div v-if="message" class="alert alert-success alert-dismissable">
                {{ message }}
            </div>
            <div class="col-sm-10">
                <a class="payment-method" @click="selectAsset(Shopify.currency)" v-bind:class="{ active: shopifyCurrencies.includes(active_currency.code)}">
                    <img src="https://checkout.stellarpay.io/v2/assets/images/xlm.svg" class="payment-method-icon">
                    <div class="payment-method-name"></div>
                    Stellar Lumens (XLM)
                </a>
                <a class="payment-method" v-for="(asset,name) in merchant.acceptedCurrencies" v-if="name != 'native'" @click="selectAsset(asset.asset_code)" v-bind:class="{ active: active_currency.code == asset.asset_code}">
                    <div class="generated_icon">{{ shortAssetName(name,1) }}</div>
                    <div class="payment-method-name"></div>
                    {{ name }}
                </a>
            </div>
            <center v-if="active_currency.code != ''">
                <div v-if="shopifyCurrencies.includes(active_currency.code)">
                    <p style="font-size:18px">
                        <br> You will pay ≈ <b>{{ (initial.xlm_amount).toFixed(7) }} XLM</b>
                        <br>
                        <p style="font-size:14px">
                            Conversion rate : {{ (initial.rate).toFixed(4) }} {{ Shopify.currency }} per XLM
                        </p>
                </div>
                <div v-else>
                    <p style="font-size:18px">
                        <br> You will pay ≈ <b>{{ active_currency.calculated }} {{ active_currency.code }}</b>
                        <br>
                        <p style="font-size:16px">
                            Conversion rate* : {{ active_currency.rate }} per XLM
                            <br> Issuer of asset : <a :href="'https://stellarchain.io/address/' + active_currency.issuer" target="_blank" style="font-size:13px;color:grey">{{shortIt(active_currency.issuer,15) }}</a>
                        </p>
                        <small style="font-size:13px">*The conversion rate is settled by merchant</small>
                </div>
            </center>
        </div>
        <div class="form-group col-sm-12">
            <button type="button" class="btn btn-primary btn-block" @click="createOrder()" :disabled="active_currency.code == ''">Continue Payment</button>
        </div>
        <center><a @click="goBack()">Back to overview</a></center>
    </div>
</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery
    export default {
        data() {
                return {
                    currencies: {}
                }
            },
            computed:  {
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
                    countDownMessage() {
                        return this.$parent.$parent.countDownMessage;
                    },
                    active_currency() {
                        return this.$parent.$parent.active_currency;
                    },
                    currency() {
                        return this.$parent.$parent.payment.currency;
                    },
                    shopifyCurrencies() {
                        return this.$parent.$parent.shopifyCurrencies;
                    },
                    Shopify() {
                        return Shopify;
                    }
            },
            methods: {
                createOrder() {
                        var prefix = this.$parent.$parent
                        if (prefix.active_currency.code == 'XLM' || prefix.active_currency.code == '') {
                            prefix.active_currency.code = "native"
                        }
                        this.axios.get(prefix.api_server + '/api/shopify_gateway/', {
                            params: {
                                key: this.$parent.$parent.merchant.id,
                                description: this.Shopify.line_items[0].title,
                                currency: prefix.active_currency.code,
                                order_id: Shopify.order_id
                            }
                        }).then(response => {
                            if (response.data.error == 'Invalid Request!') {
                                this.$parent.$parent.error = 'Invalid payment request. You need to create new order from merchant`s site!'
                                this.$router.push({
                                    name: 'invalid'
                                })
                            } else {
                                this.$parent.$parent.order = response.data
                                if (prefix.countDownMessage == '') {
                                    window.setInterval(() => {
                                        this.$parent.$parent.checkShopifyStatus()
                                    }, 7500);
                                }
                                this.$router.push({
                                    name: 'process'
                                })
                            }
                        })
                    },
                    selectAsset(asset) {
                        if (asset == "USD") {
                            this.$parent.$parent.active_currency.code = 'native_usd'
                        } else if (asset == "EUR") {
                            this.$parent.$parent.active_currency.code = 'native_eur'
                        } else if (asset == "GBP") {
                            this.$parent.$parent.active_currency.code = 'native_gbp'
                        } else if (asset == "JPY") {
                            this.$parent.$parent.active_currency.code = 'native_jpy'
                        } else if (asset == "CAD") {
                            this.$parent.$parent.active_currency.code = 'native_cad'
                        } else if (asset == "SGD") {
                            this.$parent.$parent.active_currency.code = 'native_sgd'
                        } else if (asset == "HKD") {
                            this.$parent.$parent.active_currency.code = 'native_hkd'
                        } else if (asset == "DKK") {
                            this.$parent.$parent.active_currency.code = 'native_dkk'
                        } else if (asset == "NZD") {
                            this.$parent.$parent.active_currency.code = 'native_nzd'
                        } else {
                            this.$parent.$parent.active_currency.code = asset
                            this.$parent.$parent.active_currency.issuer = this.$parent.$parent.merchant.acceptedCurrencies[asset]['issuer']
                            this.$parent.$parent.active_currency.rate = this.$parent.$parent.merchant.acceptedCurrencies[asset]['rate']
                            this.$parent.$parent.active_currency.calculated = ((this.initial.xlm_amount) / this.$parent.$parent.merchant.acceptedCurrencies[asset]['rate']).toFixed(7)
                        }
                    },
                    shortIt(string, length) {
                        var maxLength = length;
                        var result = string.substring(0, maxLength) + '...';
                        return result
                    },
                    shortAssetName(string, length) {
                        var maxLength = length;
                        var result = string.substring(0, maxLength);
                        return result
                    },
                    goBack() {
                        this.$router.push({
                            name: 'overview'
                        })
                    }
            }
    }
</script>