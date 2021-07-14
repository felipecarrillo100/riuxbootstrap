import * as React from 'react';
import AbstractForm, {AbstractFormProps, SubmitButtonsRow} from "riux/lib/components/forms/abstract/AbstractForm";
import {Button, Form} from "react-bootstrap";
import {Command, genereteUniqueID} from "riux/lib/reduxboilerplate/command/reducer";
import {ApplicationCommands} from "riux/lib/commands/ApplicationCommands";
import {LayerTypes} from "riux/lib/components/luciad/interfaces/LayerTypes";
import {Actions} from "riux/lib/reduxboilerplate/actions";
import {SendCommand} from "riux/lib/reduxboilerplate/command/actions";
import {connect} from "react-redux";
import {connectForm} from "riux/lib/reduxboilerplate/connectForm";


interface DispatchProps {
    sendCommand: (command: Command) => void;
}

type Props = DispatchProps & AbstractFormProps;

interface State {
    label: string;
}

class ConnectGroupForm extends AbstractForm<Props, State> {
    constructor(props: any) {
        super(props);
        this.setParentTitle('Create Layer Group');
        this.state = {
            label: ""
        }
    }

    protected isReadyToSubmit(): boolean {
        return super.isReadyToSubmit() && this.state.label.length > 0;
    }

    protected onSubmit(event: React.SyntheticEvent) {
        super.onSubmit(event);
        const command: Command = {
            uid: genereteUniqueID(),
            action: ApplicationCommands.CREATEANYLAYER,
            parameters: {
                "layerType": LayerTypes.LayerGroup,
                "layer": {
                    "label": this.state.label,
                    "visible": true
                },
                "autozoom": true
            },

        }
        this.props.sendCommand(command);
    }

    render(): any {
        return (
            <Form onSubmit={this.onSubmit} style={{width: 480, maxWidth:"100%"}}>
                <Form.Group controlId="label-id">
                    <Form.Label>Enter Group Name</Form.Label>
                    <Form.Control type="text" value={this.state.label} name="label" onChange={this.handleChange}/>
                </Form.Group>
                <hr />
                <Form.Group style={{float: "right"}}>
                    <Button variant="secondary" onClick={this.onCancel} >
                        Close
                    </Button>
                    <Button variant="primary"
                        type="submit"
                        disabled={!this.isReadyToSubmit()}
                    >
                        Commit
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

function mapStateToProps(state: unknown): unknown {
    return {};
}

function mapDispatchToProps(dispatch: React.Dispatch<Actions>): DispatchProps {
    return {
        sendCommand: (command: Command) => {
            dispatch(SendCommand(command))
        }
    };
}

export default connectForm<unknown, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(ConnectGroupForm);
