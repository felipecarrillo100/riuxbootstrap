import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

import "./AppNavbar.scss"
import {Command, genereteUniqueID} from "riux/lib/reduxboilerplate/command/reducer";
import {Actions} from "riux/lib/reduxboilerplate/actions";
import {connect} from "react-redux";
import {SendCommand} from "riux/lib/reduxboilerplate/command/actions";
import {ApplicationCommands} from "riux/lib/commands/ApplicationCommands";
import {
    setWINDOWMANAGERParameters,
    WindowManagerActions
} from "riux/lib/components/desktop/interfaces/WindowManagerActions";
import {UIFormRecords} from "../forms/interfaces/UIFormRecords";
import CheckboxInMenuItem from "./controls/CheckboxInMenuItem";
import {isWindowPresent, WindowElement} from "riux/lib/reduxboilerplate/windowManager/reducer";
import {BasicFormRecords} from "riux/lib/components/forms/BasicForms";
import {IAppState} from "riux/lib/reduxboilerplate/store";

interface StateProps {
    windows?: WindowElement[];
}

interface DispatchProps {
    sendCommand: (command: Command) => void;
}

type Props = StateProps & DispatchProps;

class AppNavbar extends React.Component<Props> {
    render() {
        return (
            <Navbar bg="light" expand="lg" className="AppNavbar">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Connect" id="basic-nav-dropdown">
                            <NavDropdown.Item onSelect={this.connectForm} eventKey={UIFormRecords.CONNECTWMS}>WMS</NavDropdown.Item>
                            <NavDropdown.Item onSelect={this.connectForm} eventKey={UIFormRecords.CONNECTWMTS}>WMTS</NavDropdown.Item>
                            <NavDropdown.Item onSelect={this.connectForm} eventKey={UIFormRecords.CONNECTWFS}>WFS</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onSelect={this.connectForm} eventKey={UIFormRecords.CONNECTLTS}>LTS</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onSelect={this.connectForm} eventKey={UIFormRecords.CONNECTTMS}>TMS</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onSelect={this.connectForm} eventKey={UIFormRecords.CONNECTGROUP}>Group</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Tools" id="tools-dropdown-id">
                            <NavDropdown.Item onSelect={this.toggleWindow} eventKey={BasicFormRecords.LayerManager} >
                                <CheckboxInMenuItem status={isWindowPresent( this.props.windows, BasicFormRecords.LayerManager )} />
                                Layer Control
                            </NavDropdown.Item>
                            <NavDropdown.Item onSelect={this.toggleWindow} eventKey={BasicFormRecords.EditAndMeasureTools} >
                                <CheckboxInMenuItem status={isWindowPresent( this.props.windows, BasicFormRecords.EditAndMeasureTools )} />
                                Edit & Measure
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    toggleWindow = (eventKey: string)  => {
        const command: Command = {
            uid: genereteUniqueID(),
            action: ApplicationCommands.WINDOWMANAGER,
            parameters: setWINDOWMANAGERParameters({
                id: eventKey,
                toggle: true,
                actionType: WindowManagerActions.CREATEWINDOW,
                formName: eventKey,
                top: 0,
                right: 0
            })
        }
        this.props.sendCommand(command);
    }

    connectForm = (eventKey: string) => {
        const command: Command = {
            uid: genereteUniqueID(),
            action: ApplicationCommands.WINDOWMANAGER,
            parameters: setWINDOWMANAGERParameters({
                id: "CONNECT-FORM",
                actionType: WindowManagerActions.CREATEWINDOW,
                formName: eventKey,
                top: 0,
                left: 0
            })
        }
        this.props.sendCommand(command);
    }
}

function mapStateToProps(state: IAppState): StateProps {
    return {
        windows: state.windowsManager.windows,
    };
}

function mapDispatchToProps(dispatch: React.Dispatch<Actions>): DispatchProps {
    return {
        sendCommand: (command: Command) => {
            dispatch(SendCommand(command))
        }
    };
}

export default connect<unknown, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(AppNavbar);

