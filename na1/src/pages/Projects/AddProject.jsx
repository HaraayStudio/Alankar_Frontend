import React, { useState } from 'react';
import styles from './CreateOrderForm.module.scss';
const OrderForm = () => {
  const [isOldClient, setIsOldClient] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formData, setFormData] = useState({
    // Client data
    clientId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    // Order data
    status: 'CREATED',
    priority: 'HIGH',
    startDate: '',
    endDate: '',
    description: '',
    type: '',
    // Steps data
    steps: []
  });
  // Print type options
  const printTypes = [
    'Wide format printing',
    'Digital Paper printing'
  ];
  // Wide format printing options
  const wideFormatOptions = {
    media: [
      'Vinyl', 'Cast Vinyl', 'Clear vinyl', 'One way vision', 'Frosted Film', 
      'Translite Film', 'Fabric cloth', 'Backlit fabric', 'Destructible Vinyl', 
      '2 year Vinyl', 'Canvas', 'Eco Texture Vinyl', 'Wallpaper', 'PP vinyl', 
      'canon Canvas 12 colour', 'Radium', 'Retro Chinese Retro', '3M Night Glow', 
      'Printing Signs', 'Star flex eco', 'Star flex solvent', 'Flex regular solvent', 
      'ACP', 'Acrylic', 'MDF', 'Curtain', 'Glass'
    ],
    printType: ['Eco solvent', 'Solvent', 'UV Print'],
    lamination: [
      'No lamination', 'Matt', 'Glossy', 'Sparkle', 'Two year outdoor', 
      'Both side gumming', 'Glossy coat', 'Matt coat', 'Floor Lamination'
    ],
    mountingSheet: [
      'Sunpack', '3mm foam sheet', '5mm foam sheet', '8mm foam sheet', 
      '10mm foam sheet', 'ACP sheet', '3mm acrylic', '5mm acrylic', 
      'Poly carbonate clear sheet', 'Poly carbonate white sheet', 
      'Bubbleguard sheet 600gsm', 'Bubbleguard sheet 900gsm', 'Metal frame', 
      'Clip on frame', 'Fabric frame', 'Acrylic stands', 'Promotional table', 
      'Rollup standy', 'Luxury rollup standy'
    ],
    framing: ['No frame', 'Half inch frame', '1inch frame', '2inch Frame'],
    installation: ['Drilling on wall', 'Pasting on site', 'Rolled prints only']
  };
  // Digital paper printing options
  const digitalPaperOptions = {
    paperTypes: [
      'Sunshine 100gsm', 'Bond Paper 100gsm', 'Art paper 130gsm', 'Art paper 170gsm', 
      'Art paper 250gsm', 'Art paper 300gsm', 'Art paper 350gsm', 'Regular sticker', 
      'NT sticker', 'NT Transperent Sticker', 'Gold Matt sticker', 'Silver Matt sticker', 
      'Holographic sticker', 'NT paper', 'Texture paper 007', 'Texture paper 008', 
      'Texture paper 009', 'Texture paper 010', 'Texture paper 012', 'Texture paper 021', 
      'Texture paper 022'
    ],
    printType: ['Digital', 'Offset', 'Screen', 'Pigment', 'Dekstop A4 Laser', 'Dekstop A4 B/W'],
    lamination: [
      'Gloss lamination', 'Matt Lamination', 'Texture Matt lamination', 
      'Sparkle Lamination', 'Spot UV', 'Spot UV + Gold', 'Spot UV + Silver'
    ],
    finishing: [
      'No cut', 'Full cut to size', 'Die Half cutting', 'Visiting card cutting', 
      'Metal Badge', 'Keychain', 'Metal Badge Hole punch', 'Table top A4 standy', 
      'Table top A3 standy'
    ],
    framing: ['No frame', 'Half inch frame', '1inch frame', '2inch Frame']
  };
  const [stepSelections, setStepSelections] = useState({
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    step5: '',
    step6: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleStepChange = (step, value) => {
    setStepSelections(prev => ({
      ...prev,
      [step]: value
    }));
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };
  const buildStepsArray = () => {
    const steps = [];
    if (formData.type === 'Wide format printing') {
      const stepNames = ['Media', 'Print Type', 'Lamination', 'Mounting sheet', 'Framing', 'Installation'];
      stepNames.forEach((stepName, index) => {
        const stepKey = `step${index + 1}`;
        if (stepSelections[stepKey]) {
          steps.push({
            stepName,
            measurement: stepSelections[stepKey],
            status: 'CREATED',
            sequence: index + 1
          });
        }
      });
    } else if (formData.type === 'Digital Paper printing') {
      const stepNames = ['Paper Types', 'Print Type', 'Lamination', 'Finishing', 'Framing'];
      stepNames.forEach((stepName, index) => {
        const stepKey = `step${index + 1}`;
        if (stepSelections[stepKey]) {
          steps.push({
            stepName,
            measurement: stepSelections[stepKey],
            status: 'CREATED',
            sequence: index + 1
          });
        }
      });
    }
    return steps;
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    // Basic validation
    if (isOldClient && !formData.clientId) {
      alert('Please enter client ID');
      return;
    }
    if (!isOldClient && (!formData.clientName || !formData.clientEmail || !formData.clientPhone || !formData.clientAddress)) {
      alert('Please fill in all client details');
      return;
    }
    if (!formData.type || !formData.startDate || !formData.endDate || !formData.description) {
      alert('Please fill in all order details');
      return;
    }
    setIsSubmitting(true);
    const orderData = {
      client: isOldClient 
        ? { id: parseInt(formData.clientId) }
        : {
            name: formData.clientName,
            email: formData.clientEmail,
            phone: formData.clientPhone,
            address: formData.clientAddress
          },
      status: formData.status,
      priority: formData.priority,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      type: formData.type,
      steps: buildStepsArray()
    };
    console.log('Submitting order data:', orderData);
    try {
      // Create FormData for multipart request
      const formDataToSend = new FormData();
      // Add order data as JSON blob with proper content type
      const orderBlob = new Blob([JSON.stringify(orderData)], {
        type: 'application/json'
      });
      formDataToSend.append('order', orderBlob);
      // Add images if selected
      if (selectedImages.length > 0) {
        selectedImages.forEach((image) => {
          formDataToSend.append('images', image);
        });
      }
      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      const response = await fetch(`http://localhost:8080/api/orders/createorder?isOldClient=${isOldClient}`, {
        method: 'POST',
        headers: {
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MSwiaWF0IjoxNzQ5NDcxMzY4LCJleHAiOjE3NDk1NTc3Njh9.TYlD54tGWBzVnjz0GHrnT6KCrX_hAIE40OoC3ELlh4M",
        },
        body: formDataToSend
      });
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      let responseData = null;
      const contentType = response.headers.get('content-type');
      // Check if response has content and is JSON
      if (contentType && contentType.includes('application/json')) {
        try {
          responseData = await response.json();
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
          responseData = { message: 'Invalid JSON response from server' };
        }
      } else {
        // If not JSON, get text response
        const textResponse = await response.text();
        console.log('Non-JSON response:', textResponse);
        responseData = { message: textResponse || 'No response from server' };
      }
      if (response.ok) {
        alert('Order created successfully!');
        console.log('Order created:', responseData);
        // Reset form
        setFormData({
          clientId: '',
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          clientAddress: '',
          status: 'CREATED',
          priority: 'HIGH',
          startDate: '',
          endDate: '',
          description: '',
          type: '',
          steps: []
        });
        setStepSelections({
          step1: '',
          step2: '',
          step3: '',
          step4: '',
          step5: '',
          step6: ''
        });
        setSelectedImages([]);
        setIsOldClient(false);
      } else {
        console.error('Error response:', responseData);
        let errorMessage = 'Unknown error';
        // Handle different HTTP status codes
        switch (response.status) {
          case 403:
            errorMessage = 'Access forbidden. Check authentication or CORS settings.';
            break;
          case 404:
            errorMessage = 'API endpoint not found. Check the URL.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = responseData?.message || `HTTP ${response.status}: ${response.statusText}`;
        }
        alert(`Error creating order: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      // Handle different types of network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Network error: Cannot connect to server. Please check if the server is running on http://localhost:8080');
      } else if (error.name === 'SyntaxError') {
        alert('Server response error: Invalid response format');
      } else {
        alert(`Network error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const getCurrentStepOptions = (stepNumber) => {
    if (formData.type === 'Wide format printing') {
      switch (stepNumber) {
        case 1: return wideFormatOptions.media;
        case 2: return wideFormatOptions.printType;
        case 3: return wideFormatOptions.lamination;
        case 4: return wideFormatOptions.mountingSheet;
        case 5: return wideFormatOptions.framing;
        case 6: return wideFormatOptions.installation;
        default: return [];
      }
    } else if (formData.type === 'Digital Paper printing') {
      switch (stepNumber) {
        case 1: return digitalPaperOptions.paperTypes;
        case 2: return digitalPaperOptions.printType;
        case 3: return digitalPaperOptions.lamination;
        case 4: return digitalPaperOptions.finishing;
        case 5: return digitalPaperOptions.framing;
        default: return [];
      }
    }
    return [];
  };
  const getStepLabel = (stepNumber) => {
    if (formData.type === 'Wide format printing') {
      const labels = ['Media', 'Print Type', 'Lamination', 'Mounting Sheet', 'Framing', 'Installation'];
      return labels[stepNumber - 1];
    } else if (formData.type === 'Digital Paper printing') {
      const labels = ['Paper Types', 'Print Type', 'Lamination', 'Finishing', 'Framing'];
      return labels[stepNumber - 1];
    }
    return '';
  };
  const getMaxSteps = () => {
    return formData.type === 'Wide format printing' ? 6 : 5;
  };
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '30px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>Create Printing Order</h1>
        <div>
          {/* Client Type Selection */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#555',
              fontSize: '20px',
              marginBottom: '15px',
              borderBottom: '2px solid #007bff',
              paddingBottom: '5px'
            }}>Client Information</h2>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="clientType"
                  checked={!isOldClient}
                  onChange={() => setIsOldClient(false)}
                  style={{ marginRight: '8px' }}
                />
                New Client
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="clientType"
                  checked={isOldClient}
                  onChange={() => setIsOldClient(true)}
                  style={{ marginRight: '8px' }}
                />
                Existing Client
              </label>
            </div>
          </div>
          {/* Client Details */}
          {isOldClient ? (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Client ID
              </label>
              <input
                type="number"
                name="clientId"
                value={formData.clientId}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
                required
                placeholder="Enter client ID"
              />
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Client Name
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  required
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  required
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Address
                </label>
                <textarea
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  required
                  placeholder="Enter complete address"
                  rows="3"
                />
              </div>
            </div>
          )}
          {/* Order Details */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#555',
              fontSize: '20px',
              marginBottom: '15px',
              borderBottom: '2px solid #007bff',
              paddingBottom: '5px'
            }}>Order Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                  required
                >
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Print Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}
                  required
                >
                  <option value="">Select print type</option>
                  {printTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                  End Date
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                required
                placeholder="Describe the printing requirements"
                rows="4"
              />
            </div>
            {/* Image Upload */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                Upload Images (Optional)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  backgroundColor: 'white'
                }}
              />
              {selectedImages.length > 0 && (
                <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                  Selected files: {selectedImages.map(file => file.name).join(', ')}
                </div>
              )}
            </div>
          </div>
          {/* Print Process Steps */}
          {formData.type && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{
                color: '#555',
                fontSize: '20px',
                marginBottom: '15px',
                borderBottom: '2px solid #007bff',
                paddingBottom: '5px'
              }}>Print Process Steps</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {Array.from({ length: getMaxSteps() }, (_, index) => {
                  const stepNumber = index + 1;
                  const stepKey = `step${stepNumber}`;
                  const options = getCurrentStepOptions(stepNumber);
                  return (
                    <div key={stepNumber}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
                        Step {stepNumber}: {getStepLabel(stepNumber)}
                      </label>
                      <select
                        value={stepSelections[stepKey]}
                        onChange={(e) => handleStepChange(stepKey, e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          fontSize: '16px',
                          backgroundColor: 'white'
                        }}
                      >
                        <option value="">Select {getStepLabel(stepNumber).toLowerCase()}</option>
                        {options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: isSubmitting ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#0056b3';
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = '#007bff';
              }
            }}
          >
            {isSubmitting ? 'Creating Order...' : 'Create Order'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderForm;