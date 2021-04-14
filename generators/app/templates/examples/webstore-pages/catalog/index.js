import React from 'react';
import { 
    CreateComponent, 
 } from '../../__components/itemsComponent';
import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';
import {
    CreateInline as CreateView,
} from '../../__views/CreateView';

import CreateForm from '../catalog/__createForm';
import qMain from '../../queries/orders.js';

import { Container } from '@material-ui/core';

export default function All() {
    return <Container>
        <LayoutView
            labels={['']}
            tabs={[
                <CreateComponent
                    query={qMain}
                    CreateView={CreateView}
                    CreateForm={CreateForm}
                />,

            ]}
        />
    </Container>;
}