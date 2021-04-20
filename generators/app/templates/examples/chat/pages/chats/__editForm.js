import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
    //modelName,
    validationSchema
} from '../chats/schema';
import Form from '../../__components/helpers/FormikEdit';
//import FieldText from '../../__components/fields/FieldText';
//import FieldTextWithSubmit from '../../__components/fields/FieldTextWithSubmit';

import {
    Chat as LayoutView,
    //Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';
import {
    CreateComponent,
    ItemsComponent
} from '../../__components/itemsComponent';
import {
    //LikesButton,
    //LikesCountComponent,
} from '../../__components/estimeComponent';
import {
    //CreateFab as CreateView,
    //CreateButton as CreateView,
    CreateInline as CreateView,
} from '../../__views/CreateView';
import {
    Chat as ItemsView,
    //Grid12 as ItemsView,
    //Table as ItemsView,
    //Grid as ItemsView,
    //List as ItemsView,
} from '../../__views/ItemsView';
import {
    ItemChat as ItemView,
    //ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';

import CreateForm from '../messages/__createForm';
import EditForm from '../messages/__editForm';
import InlineForm from '../messages/__inlineForm';
import InlineForm2 from '../messages/__inlineForm2';
import DeleteForm from '../messages/__deleteForm';
import TableForm from '../messages/__tableForm';
import qMain from '../../queries/messages.js';

const Item = ({ item, isNew, update, setActive }) => {

    const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <ItemsComponent
                    query={qMain}
                    parentObjects={{chatId: item.id}}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={EditForm}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
                    TableForm={TableForm(theme)}
                    DeleteForm={DeleteForm}
                    options={{
                        inline: false,
                        editable: false,
                        deletable: true
                    }}
                />,
                <CreateComponent
                    query={qMain}
                    parentObjects={{chatId: item.id}}
                    CreateView={CreateView}
                    CreateForm={CreateForm}
                />,

            ]
            }
        />
        }
    </Form>
};

export default Item;