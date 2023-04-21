import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Item } from "../../types/types";

interface ItemComponent {
    numbering?: number,
    isEditing?: Boolean,
    onDeleteBtn?: React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLButtonElement>,
    title: String,
    price: String
}

export const ItemComponent = ({numbering, title, price, isEditing, onDeleteBtn} : ItemComponent) => {
   return (
       <div className="item-component">            
            {numbering !== null ?? <div className="number">{numbering}</div>}
            <div className="title">{title}</div>
            <div className="price">{price}</div>
            {isEditing ? <Button onClick={onDeleteBtn}><DeleteOutlined/></Button> : <></>}
       </div>
   );
};