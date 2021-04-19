import React from 'react';
import {
    validationSchema
} from '../products/schema';
import Form from '../../__components/helpers/FormikEdit';

import {
    Raw as LayoutView,
} from '../../__views/LayoutView';
import { CreateOneButton } from '../../__components/estimeComponent';
import {
    //CreateComponent,
} from '../../__components/itemsComponent';
import {
    //CreateInline as CreateView,
} from '../../__views/CreateView';

import qMain from '../../queries/orderitems.js';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
//import CreateForm from '../catalogItems/__createForm';

const Item = ({ item, isNew, update, setActive }) => {
    let newOrderId = localStorage.getItem('updateOrder');
    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <CreateOneButton
                    query={qMain}
                    parentObjects={{ productId: item.id, orderId: newOrderId }}
                    fullIcon={<ShoppingCartIcon />}
                    emptyIcon={<ShoppingCartOutlinedIcon />}

                />,

            ]
            }
        />
        }
    </Form>
};

export default Item;