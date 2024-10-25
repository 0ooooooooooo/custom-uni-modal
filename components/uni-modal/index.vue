<template>
    <view>
        <uni-popup id="popupModal" ref="popupModal" type="center" :animation="true" @change="popupChange" :mask-click="maskClick">
			<view class="custom-modal">
                <view class="modal-title">
                    {{title}}
                </view>
                <view class="modal-content">
                    {{content}}
                </view>
                <view class="modal-line"></view>
                <view class="modal-button">
                    <text class="text-1" v-if="showCancel" @click="cancel('cancel')">{{cancelText}}</text>
                    <text class="text-2" v-if="showCancel"></text>
                    <text class="text-3" @click="success('confirm')">{{confirmText}}</text>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
export default {
    name: 'showModalComponent',
    computed: {
        show() {
            if (this.$modalStore.state.show) {
                this.$refs.popupModal && this.$refs.popupModal.open();
            } else {
                if (this.$refs.popupModal && 'close' in this.$refs.popupModal) {
                this.$refs.popupModal && this.$refs.popupModal.close();
                }
            }
        },
        maskClick() {
            return this.$modalStore.state.maskClick;
        },
        title() {
            return this.$modalStore.state.title;
        },
        content() {
            return this.$modalStore.state.content;
        },
        showCancel() {
            return this.$modalStore.state.showCancel;
        },
        cancelText() {
            return this.$modalStore.state.cancelText;
        },
        cancelColor() {
            return this.$modalStore.state.cancelColor;
        },
        cancelBackgroundColor() {
            return this.$modalStore.state.cancelBackgroundColor;
        },
        confirmText() {
            return this.$modalStore.state.confirmText;
        },
        confirmColor() {
            return this.$modalStore.state.confirmColor;
        },
        confirmBackgroundColor() {
            return this.$modalStore.state.confirmBackgroundColor;
        },
		starShow() {
			return this.$modalStore.state.star;
		}
    },
    methods: {
        cancel (res) {
            this.$modalStore.commit('hideModal');
            this.$modalStore.commit('success', res);
        },
        success (res) {
            this.$modalStore.commit('hideModal');
            this.$modalStore.commit('success', res);
        },
        popupChange (res) {
            if (!res.show) {
                this.$modalStore.commit('hideModal');
            }
        }
    },
    beforeDestroy(){
        this.$modalStore.commit('hideModal');
    }
}
</script>

<style>
.custom-modal{
    transform: translateX(48rpx);
    width: calc(100% - 96rpx);
    background: #FFFFFF;
    border-radius: 10rpx;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
.custom-modal .modal-title{
    margin: 48rpx 0 4rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: #111111;
}
.custom-modal .modal-content{
    font-size: 28rpx;
    color: rgba(17,17,17,0.8);
    text-align: center;
    margin: 26rpx 32rpx 48rpx;
    line-height: 46rpx;
}
.custom-modal .modal-line{
    width: 100%;
    height: 2rpx;
    background: #EDEDED;
}
.custom-modal .modal-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    justify-items: center;
}
.custom-modal .modal-button .text-1 {
    margin: 38rpx 0rpx 34rpx;
    flex: 1;
    text-align: center;
    font-size: 30rpx;
    color: rgba(17,17,17,0.64);
}
.custom-modal .modal-button .text-2 {
    width: 2rpx;
    background: #DDDDDD;
}
.custom-modal .modal-button .text-3 {
    margin: 38rpx 0rpx 34rpx;
    flex: 1;
    text-align: center;
    font-size: 30rpx;
    /* font-weight: bold; */
    color: #111111;
}
.star{
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
	margin-bottom: 48rpx;
}
.star-1{
	width: 48rpx;
	height: 46rpx;
}
.star-2{
	margin: 0 50rpx;
	width: 72rpx;
	height: 68rpx;
}
</style>