import React from 'react';


const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  display: 'flex',
  marginBottom: '10px'
};

class FileUploader extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      files: [],
    };
  }

  onChange(e) {
    var reader = new FileReader();
        reader.onload =  () => {
            const result = reader.result;
            this.props.onFileLoaded(result, e.target.value);
        };
      
        reader.readAsBinaryString(e.target.files[0]);
  }

  removeFile(f) {
    this.setState({ files: this.state.files.filter(x => x !== f) });
  }

  render() {
    return (
      <div style={styles}>
        <label className="custom-file-upload">
          <input type="file" multiple onChange={this.onChange} />
           Open CSV
        </label>
        {this.state.files.map(x =>
          <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
        )}
      </div>
    );
  }
}


export default FileUploader;
