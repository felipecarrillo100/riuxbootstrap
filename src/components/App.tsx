import React from "react";

import Workspace from "riux/lib/components/luciad/workspace/Workspace";
import GlobalContextMenu from "riux/lib/components/customcontextmenu/GlobalContextMenu";
import {ScreenMessageContainer} from "riux/lib/components/screenmessage/ScreenMessage";
import Desktop from "riux/lib/components/desktop/Desktop";
import {connect, DispatchProp} from "react-redux";
import {setContextMenu} from "riux/lib/reduxboilerplate/contextMenu/actions";
import {Actions} from "riux/lib/reduxboilerplate/actions";
import AppNavbar from "./bootstrap/navbar/AppNavbar";
import BootstrapForms from "./bootstrap/forms/BootstrapForms";

interface DispatchProps {
    setContextMenu: (contextMenu: GlobalContextMenu) => void;
}

type Props = DispatchProps;

class App extends React.Component<Props>{
    private contextMenuRef: any;

    constructor(props:Props) {
        super(props);
        BootstrapForms.RegisterForms();
    }

    componentDidMount() {
        if (this.contextMenuRef) {
            this.props.setContextMenu(this.contextMenuRef);
        }
    }

    render() {
        return (
            <div className="App">
                <Desktop>
                    <Workspace />
                </Desktop>
                <AppNavbar />
                <GlobalContextMenu ref={(ref: any) => (this.contextMenuRef = ref)} />
                <ScreenMessageContainer />
            </div>
        );
    }
}

function mapStateToProps(state: unknown): unknown {
    return {};
}

function mapDispatchToProps(dispatch: React.Dispatch<Actions>): DispatchProps {
    return {
        setContextMenu: (contextMenu) => dispatch(setContextMenu(contextMenu)),
    };
}

export default connect<unknown, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(App);

