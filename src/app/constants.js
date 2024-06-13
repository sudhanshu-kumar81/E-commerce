

export const ITEM_PER_PAGE=9;

export function discountedPrice(item){
    return Math.round(item.price*(1-item.discountPercentage/100),2)
}
export const RESET_STATE = 'RESET_STATE';

export const resetState = () => ({
  type: RESET_STATE,
});