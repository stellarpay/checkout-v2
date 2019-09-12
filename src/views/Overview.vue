<template>
    <div class="container card-details">
        <form>
            <div class="products">
                <h3 class="title">Order Summary</h3>
                <div class="item">
                    <span class="price">{{ Shopify.subtotal_price }} {{ Shopify.currency }}</span>
                    <p class="item-name">Item(s)</p>
                    <div v-for="product in Shopify.line_items">
                        <p class="item-description"> {{ product.title }} <span class="price">{{ product.line_price }} {{ Shopify.currency }}</span></p>
                    </div>
                </div>
                <div class="item">
                    <span class="price">{{ Shopify.shipping_rate.price }} {{ Shopify.currency }} </span>
                    <p class="item-name">Fees</p>
                    <p class="item-description">Shipping <span class="price">{{ Shopify.shipping_rate.price }} {{ Shopify.currency }}</span></p>
                    <p class="item-description">Transaction fee <span class="price">0.00 {{ Shopify.currency }}</span></p>
                </div>
                <div class="total">Total<span class="price">{{ Shopify.total_price }} {{ Shopify.currency }}</span></div>
            </div>
        </form>
        </br>
        <div class="form-group col-sm-12">
            <button type="button" class="btn btn-primary btn-block" @click="paymentMethods()">Continue</button>
        </div>
    </div>
</template>

<script>
    import JQuery from 'jquery'
    let $ = JQuery
    export default {
        data() {
                return {
                    api_server: 'https://api.stellarpay.io',
                }
            },
            computed:  {
                Shopify() {
                    return Shopify;
                }
            },
            methods:  {
                paymentMethods() {
                    this.$parent.$parent.loading = true
                    this.$router.push({
                        name: 'payment_methods'
                    })
                    this.$parent.$parent.checkXLMPriceAndCalculate();
                }
            }
    }
</script>