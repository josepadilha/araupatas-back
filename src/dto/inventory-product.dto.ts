export interface InventoryProductDTO {
  id: string;
  name: string;
  category: string;
  unit: string;
  currentQuantity: number;
  warehouseId: string;
  lastEntry?: string;
  lastExit?: string;
}