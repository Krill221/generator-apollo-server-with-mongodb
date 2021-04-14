import React from 'react';
import {
    validationSchema
} from '../orders/schema';
import Form from '../../__components/helpers/FormikNew';
import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';
import {
    ItemsComponent
} from '../../__components/itemsComponent';
import {
    Grid as ItemsView,
} from '../../__views/ItemsView';
import {
    ItemCard as ItemView,
} from '../../__views/ItemView';

import InlineForm from '../catalogItems/__inlineForm';
import InlineForm2 from '../catalogItems/__inlineForm2';
import qMain from '../../queries/products.js';

const Item = ({ item, add, setActive }) => {

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <ItemsComponent
                    query={qMain}
                    //parentObjects={{roomId: null}}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={null}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
                    TableForm={null}
                    DeleteForm={null}
                    options={{
                        inline: true,
                        editable: false,
                        deletable: false
                    }}
                />,
            ]
            }
        />
        }
    </Form>
};

export default Item;