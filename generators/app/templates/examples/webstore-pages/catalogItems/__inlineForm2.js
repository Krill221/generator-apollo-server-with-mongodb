import React from 'react';
import {
    validationSchema
} from '../products/schema';
import Form from '../../__components/helpers/FormikEdit';

import {
    Raw as LayoutView,
} from '../../__views/LayoutView';
import { CreateOneButton } from '../../__components/estimeComponent';

import qMain from '../../queries/orderitems.js';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

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