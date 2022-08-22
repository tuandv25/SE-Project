import {prisma, pubsub} from '../context.js';
const Subscription = {
    VoucherCreate:{
        subscribe(parent, agrs, context, info){
            return pubsub.asyncIterator(['VOUCHER_CREATE']);
        }
    },
    EventCreate:{
        subscribe(parent, agrs, context, info){
            return pubsub.asyncIterator(['EVENT_CREATE']);
        }
    }, 
    OrderUpdate: {
        subscribe(parent, {userId}, context, info){
            return pubsub.asyncIterator([`ORDER_UPDATE_${userId}`]);
        }
    }, 
    NewOrder:{
        subscribe(parent,args, context, info){
            return pubsub.asyncIterator(['NEW_ORDER']);
        }
    }
}
export default Subscription;