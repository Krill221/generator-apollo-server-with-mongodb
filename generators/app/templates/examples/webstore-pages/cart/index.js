import React, {
    useContext
} from 'react';
import { AuthContext } from '../../__providers/authProvider';
import { useTheme } from '@material-ui/core/styles';
import { CreateComponent, ItemsComponent } from '../../__components/itemsComponent';
import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';
import {
    CreateFab as CreateView,
} from '../../__views/CreateView';
import {
    Grid as ItemsView,
} from '../../__views/ItemsView';
import {
    ItemCard as ItemView,
} from '../../__views/ItemView';

import CreateForm from '../cart/__createForm';
import InlineForm from '../cartitems/__inlineForm';
import InlineForm2 from '../cartitems/__inlineForm2';
import DeleteForm from '../cartitems/__deleteForm';
import qMain from '../../queries/orders.js';
import qOrderItems from '../../queries/orderitems.js';


import { Container } from '@material-ui/core';

export default function All() {
    const theme = useTheme();

    const { user } = useContext(AuthContext);
    let newOrderId = localStorage.getItem('updateOrder');

    return <Container>
        <LayoutView
            labels={['']}
            tabs={[
                <ItemsComponent
                    query={qOrderItems}
                    parentObjects={{ orderId: newOrderId, userId: user?.id }}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={null}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
                    TableForm={null}
                    DeleteForm={DeleteForm}
                    options={{
                        inline: true,
                        editable: false,
                        deletable: true
                    }}
                />,
                <CreateComponent
                    label={theme.props.components.MakeOrder}
                    query={qMain}
                    parentObjects={{ userId: user?.id }}
                    CreateView={CreateView}
                    CreateForm={CreateForm}
                />,

            ]}
        />
    </Container>;
}