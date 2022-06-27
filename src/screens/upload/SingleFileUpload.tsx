import React, {useEffect, useState} from 'react';
import {FileHeader} from './FileHeader';
import {Progress, Row} from "reactstrap";

export interface SingleFileUploadWithProgressProps {
    file: File;
    onUpload: (file: File, url: string) => void;
}

export function SingleFileUpload({
                                                 file,
                                                 onUpload,
                                             }: SingleFileUploadWithProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        async function upload() {
            const url = await uploadFile(file, setProgress);
            onUpload(file, url);
        }

        upload();
    }, []);

    return (
        <Row style={{width: "40%", paddingBottom: "10px"}} className="block-example border border-top-0 border-dark">
            <FileHeader file={file} progress={progress}/>
            <Progress color="success" value={progress}/>
        </Row>
    );
}

function uploadFile(file: File, onProgress: (percentage: number) => void) {
    const url = 'https://eobb4i8fnz4a8th.m.pipedream.net';

    return new Promise<string>((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.onload = () => {
            const resp = JSON.parse(xhr.responseText);
            res(resp.secure_url);
        };
        xhr.onerror = (evt) => rej(evt);
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentage = (event.loaded / event.total) * 100;
                onProgress(Math.round(percentage));
            }
        };

        const formData = new FormData();
        formData.append('file', file);

        xhr.send(formData);
    });
}
