<template>
    <div class="container">
        <div class="card-details">
            <center>
                <div class="sweet-modal-icon sweet-modal-error animateErrorIcon"><span class="sweet-modal-x-mark animateXMark"><span class="sweet-modal-line sweet-modal-left"></span> <span class="sweet-modal-line sweet-modal-right"></span></span></div>
                <h3 style="font-size:25px">It looks like you weren't to complete a transaction in time.
                    <br><br>
                    If you believe there's been a mistake, please contact us at <b>support@stellarpay.io</b> with the following order code:
                    <b>{{ fetchOrder.orderId }}</b></h3>
                <br>
                <div class="form-group col-sm-9">
                    <a :href="merchant.cancel">Return merchant's site</a>
                </div>
            </center>
        </div>
    </div>
</template>

<script>
export default{
    computed:{
        fetchOrder(){
            return this.$parent.$parent.fetchOrder
        },
        merchant(){
            return this.$parent.$parent.merchant
        }
    }
}
</script>