<template>
    <div class="container">
        <div class="card-details">
            <center>
                <div class="sweet-modal-icon sweet-modal-success animate"><span class="sweet-modal-line sweet-modal-tip animateSuccessTip"></span><span class="sweet-modal-line sweet-modal-long animateSuccessLong"></span><div class="sweet-modal-placeholder"></div><div class="sweet-modal-fix"></div></div>
                <h3 style="font-size:25px">PAYMENT IS SUCCESSFULY DONE</h3>
                <br>
                <h4><a :href="'https://stellarchain.io/tx/' + fetchOrder.transactionId" target="_blank" style="font-size:15px;color:grey">Check Transaction on StellarChain</a></h4>
                <div class="form-group col-sm-9">
                    <a :href="merchant.success">Return merchant's site</a>
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