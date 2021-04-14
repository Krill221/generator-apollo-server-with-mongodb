import React, {
    useContext
} from 'react';
import { AuthContext } from '../../__providers/authProvider';
import {
    ItemsComponent
} from '../../__components/itemsComponent';
import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';
import {
    Grid as ItemsView,
} from '../../__views/ItemsView';
import {
    ItemCard as ItemView,
} from '../../__views/ItemView';

import EditForm from '../delivery/__editForm';
import InlineForm from '../delivery/__inlineForm';
import InlineForm2 from '../delivery/__inlineForm2';
import DeleteForm from '../delivery/__deleteForm';
import qMain from '../../queries/orders.js';

import { Container } from '@material-ui/core';

export default function All() {
    const { user } = useContext(AuthContext);

    return <Container>
        <LayoutView
            labels={['']}
            tabs={[
                <ItemsComponent
                    query={qMain}
                    parentObjects={{userId: user?.id}}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={EditForm}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
                    TableForm={null}
                    DeleteForm={DeleteForm}
                    options={{
                        inline: false,
                        editable: true,
                        deletable: true
                    }}
                />,

            ]}
        />
    </Container>;
}