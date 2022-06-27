import React from 'react';
import { FileError } from 'react-dropzone';
import { FileHeader } from './FileHeader';
import {Progress, Row} from "reactstrap";

export interface UploadErrorProps {
    file: File;
    errors: FileError[];
}

export function UploadError({ file, errors }: UploadErrorProps) {
    return (
        <Row style={{width: "40%"}} className="block-example border border-top-0 border-dark">
        <FileHeader file={file}  progress={100} />
            <Progress color="danger"  value={100} />
            {errors.map((error) => (
                <div style={{textAlign: "center"}} key={error.code}>
                    <h5>{error.message}</h5>
                </div>
            ))}
        </Row>
    );
}
