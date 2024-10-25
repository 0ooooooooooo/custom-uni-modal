import Vuex from 'vuex';
export default function initModal (v) {
    v.prototype.$modalStore = new Vuex.Store({
        state: {
            show: false,
            title: '',
            content: '',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#ED4F4E',
            cancelBackgroundColor: '#FFE5E5',
            confirmText: '确定',
            confirmColor: '#FFFEFA',
            confirmBackgroundColor: 'linear-gradient(0deg, #F65555 0%, #E54848 100%)',
            success: null,
            cancel: null,
            maskClick: true,
			star: false
        },
        mutations: {
            hideModal(state) {
                state.show = false;
            },
            showModal(state,data) {
                this.commit('init');
                state = Object.assign(state, data);
                console.log(state);
                state.show = true;
            },
            success(state, res) {
                let resObj = {
                    cancel: false,
                    confirm: false
                }
                if (res === 'confirm') {
                    resObj.confirm = true;
                    state.success && state.success(state);
                } else {
                    resObj.cancel = true;
                    state.cancel && state.cancel();
                }
            },
            init(state, res){
                state.title = "";
                state.content = ""
                state.confirmText = "确定"
                state.success = null
                state.cancel = null
                state.maskClick = true
                state.star = false
            }
        }
    });
    v.prototype.$showModal = function (option) { 
        if (typeof option === 'object') {
            v.prototype.$modalStore.commit('showModal', option)
        } else {
            throw '配置项必须为对象传入的值为：' + typeof option;
        }
    }
}