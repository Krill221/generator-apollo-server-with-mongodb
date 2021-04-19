import React, {
    useContext
} from 'react';
import { AuthContext } from '../../__providers/authProvider';
import {
    CreateComponent,
} from '../../__components/itemsComponent';
import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';
import {
    CreateInline as CreateView,
} from '../../__views/CreateView';
import {
    CreateFab as CreateView2,
} from '../../__views/CreateView';

import CreateFormInline from './__createFormInline';
import CreateForm from './__createForm';
import qMain from '../../queries/orders.js';
import qOrderItems from '../../queries/orderitems.js';

import { Container, useTheme } from '@material-ui/core';
import { useSumHook } from '../../__components/estimeComponent';

export default function All() {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    let newOrderId = localStorage.getItem('updateOrder');
    const itemsSum = useSumHook(qOrderItems, { orderId: newOrderId, userId: user?.id }, ['value', 'productId.price'], 'multiply');

    return <Container>
        <LayoutView
            labels={['']}
            tabs={[
                <CreateComponent
                    query={qMain}
                    CreateView={CreateView}
                    CreateForm={CreateFormInline}
                />,
                <>
                    {
                        Number(itemsSum) > 0 && <CreateComponent
                            parentObjects={{ userId: user?.id }}
                            label={`${theme.props.components.Cart}: $${itemsSum}`}
                            query={qMain}
                            CreateView={CreateView2}
                            CreateForm={CreateForm}
                        />
                    }
                </>,

            ]}
        />
    </Container>;
}