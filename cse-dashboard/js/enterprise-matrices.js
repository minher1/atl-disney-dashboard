// Enterprise Architecture Matrices - Interactive Functionality

// Matrix toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const matrix1Btn = document.getElementById('matrix1Btn');
    const matrix2Btn = document.getElementById('matrix2Btn');
    const matrix1 = document.getElementById('matrix1');
    const matrix2 = document.getElementById('matrix2');

    matrix1Btn.addEventListener('click', function() {
        matrix1Btn.classList.add('active');
        matrix2Btn.classList.remove('active');
        matrix1.classList.add('active');
        matrix2.classList.remove('active');
    });

    matrix2Btn.addEventListener('click', function() {
        matrix2Btn.classList.add('active');
        matrix1Btn.classList.remove('active');
        matrix2.classList.add('active');
        matrix1.classList.remove('active');
        
        // Load Matrix 2 if not already loaded
        if (!matrix2.dataset.loaded) {
            loadMatrix2();
            matrix2.dataset.loaded = 'true';
        }
    });
});

// Load Matrix 2: IBM Installed Base & Opportunities
function loadMatrix2() {
    const matrix2 = document.getElementById('matrix2');
    
    const matrix2HTML = `
        <div class="matrix-grid">
            <!-- Left Sidebar: IBM Client Engineering (CE) -->
            <div class="sidebar-left">
                <div class="sidebar-title">IBM Client Engineering (CE)</div>
                
                <div class="sidebar-section security">
                    <div class="section-header">Security - Installed Base</div>
                    <div class="tech-item highlight">
                        <strong>Guardium Data Encryption</strong>
                        <div style="font-size: 8px; margin-top: 3px; color: #0f62fe;">
                            ✓ Protecting sensitive Disney data<br>
                            💡 Expand to cloud workloads
                        </div>
                    </div>
                    <div class="tech-item highlight">
                        <strong>Guardium Data Protection</strong>
                        <div style="font-size: 8px; margin-top: 3px; color: #0f62fe;">
                            ✓ Database activity monitoring<br>
                            💡 Add AI-powered threat detection
                        </div>
                    </div>
                    <div class="tech-item opportunity">
                        Guardium Data Security Center
                        <div style="font-size: 8px; margin-top: 3px;">
                            💡 Unified security posture mgmt
                        </div>
                    </div>
                    <div class="tech-item explore">
                        Guardium Discover & Classify
                        <div style="font-size: 8px; margin-top: 3px;">
                            🔍 Data discovery for compliance
                        </div>
                    </div>
                </div>

                <div class="sidebar-section identity">
                    <div class="section-header">Identity & Access - Opportunities</div>
                    <div class="tech-item explore">
                        Security Verify (IAM)
                        <div style="font-size: 8px; margin-top: 3px;">
                            🔍 Modern IAM for Disney+
                        </div>
                    </div>
                    <div class="tech-item highlight">
                        <strong>HashiCorp Vault</strong>
                        <div style="font-size: 8px; margin-top: 3px; color: #0f62fe;">
                            ✓ Secrets management<br>
                            💡 Expand to all environments
                        </div>
                    </div>
                    <div class="tech-item highlight">
                        <strong>HashiCorp Consul</strong>
                        <div style="font-size: 8px; margin-top: 3px; color: #0f62fe;">
                            ✓ Service mesh deployed<br>
                            💡 Multi-cloud expansion
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Area -->
            <div class="main-content">
                <!-- AI Assistants Row -->
                <div class="layer-row ai-assistants">
                    <div class="layer-header">AI & Automation - IBM Value Proposition</div>
                    <div class="tech-grid">
                        <div class="tech-box highlight">
                            <strong>watsonx.ai</strong>
                            <div class="sub">✓ Foundation models deployed<br>💡 Expand to content generation</div>
                        </div>
                        <div class="tech-box opportunity">
                            watsonx Assistants
                            <div class="sub">💡 Customer service automation</div>
                        </div>
                        <div class="tech-box highlight">
                            <strong>watsonx.governance</strong>
                            <div class="sub">✓ AI governance framework<br>💡 Expand to all AI workloads</div>
                        </div>
                        <div class="tech-box explore">
                            watsonx Code Assistant
                            <div class="sub">🔍 Developer productivity</div>
                        </div>
                        <div class="tech-box opportunity">
                            Automation (RPA)
                            <div class="sub">💡 Process automation opportunities</div>
                        </div>
                        <div class="tech-box explore">
                            Cognos Analytics
                            <div class="sub">🔍 BI modernization</div>
                        </div>
                    </div>
                </div>

                <!-- Data Platform Row -->
                <div class="layer-row data-layer">
                    <div class="sub-layer">
                        <div class="layer-header">Data Platform - Core IBM Strength</div>
                        <div class="tech-grid">
                            <div class="tech-box highlight">
                                <strong>watsonx.data</strong>
                                <div class="sub">✓ Data lakehouse deployed<br>💡 Expand to all analytics</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>DB2</strong>
                                <div class="sub">✓ Mission-critical databases<br>💡 Modernize to cloud</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>Netezza</strong>
                                <div class="sub">✓ Data warehouse<br>💡 Migrate to watsonx.data</div>
                            </div>
                            <div class="tech-box opportunity">
                                DataStage
                                <div class="sub">💡 ETL modernization</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>StreamSets</strong>
                                <div class="sub">✓ Data integration<br>💡 Real-time pipelines</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>Databand</strong>
                                <div class="sub">✓ Data observability<br>💡 Expand coverage</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Integration Layer -->
                <div class="layer-row app-dev">
                    <div class="sub-layer">
                        <div class="layer-header">Integration - Strong IBM Footprint</div>
                        <div class="tech-grid">
                            <div class="tech-box highlight">
                                <strong>MQ</strong>
                                <div class="sub">✓ Enterprise messaging<br>💡 Cloud-native migration</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>DataPower</strong>
                                <div class="sub">✓ API gateway<br>💡 Modernize to API Connect</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>Aspera</strong>
                                <div class="sub">✓ High-speed file transfer<br>💡 Expand to content delivery</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>APP Connect</strong>
                                <div class="sub">✓ Integration platform<br>💡 SaaS expansion</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>API Connect</strong>
                                <div class="sub">✓ API management<br>💡 Developer portal enhancement</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>CP4i</strong>
                                <div class="sub">✓ Integration suite<br>💡 Event-driven architecture</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>FTM</strong>
                                <div class="sub">✓ Financial transactions<br>💡 Payment modernization</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Red Hat OpenShift Platform Row -->
                <div class="layer-row openshift">
                    <div class="layer-header redhat">
                        Red Hat OpenShift - Strategic Platform
                        <div style="font-size: 10px; margin-top: 5px; font-weight: normal;">
                            ✓ Hybrid cloud foundation | 💡 Expand to all containerized workloads | 🔍 AI/ML platform opportunity
                        </div>
                    </div>
                </div>

                <!-- Infrastructure Row -->
                <div class="layer-row infrastructure">
                    <div class="sub-layer">
                        <div class="layer-header">Storage - Significant Installed Base</div>
                        <div class="tech-grid">
                            <div class="tech-box highlight">
                                <strong>DS8000 Series</strong>
                                <div class="sub">✓ Enterprise storage<br>💡 Flash modernization</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>Tape Storage</strong>
                                <div class="sub">✓ Archive & backup<br>💡 Cloud archive tier</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>Storage Virtualize</strong>
                                <div class="sub">✓ SAN virtualization<br>💡 Software-defined storage</div>
                            </div>
                            <div class="tech-box opportunity">
                                Fusion HCI
                                <div class="sub">💡 Hyperconverged infrastructure</div>
                            </div>
                        </div>
                    </div>

                    <div class="sub-layer">
                        <div class="layer-header">Power Systems - Mission Critical</div>
                        <div class="tech-grid">
                            <div class="tech-box highlight">
                                <strong>Power9 E950</strong>
                                <div class="sub">✓ SAP HANA platform<br>💡 Power10 upgrade path</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>AIX</strong>
                                <div class="sub">✓ Core applications<br>💡 Containerization strategy</div>
                            </div>
                            <div class="tech-box opportunity">
                                IBM i
                                <div class="sub">💡 Modernization opportunities</div>
                            </div>
                        </div>
                    </div>

                    <div class="sub-layer">
                        <div class="layer-header">Z Systems - Strategic Platform</div>
                        <div class="tech-grid">
                            <div class="tech-box highlight">
                                <strong>IBM LinuxONE</strong>
                                <div class="sub">✓ Linux consolidation<br>💡 Cloud-native workloads</div>
                            </div>
                            <div class="tech-box highlight">
                                <strong>z/OS</strong>
                                <div class="sub">✓ Core banking systems<br>💡 AI on Z opportunity</div>
                            </div>
                            <div class="tech-box opportunity">
                                Z Security
                                <div class="sub">💡 Pervasive encryption</div>
                            </div>
                        </div>
                    </div>

                    <div class="sub-layer">
                        <div class="layer-header">IBM Cloud - Growth Opportunity</div>
                        <div class="tech-grid">
                            <div class="tech-box explore">
                                IBM Cloud IaaS
                                <div class="sub">🔍 Hybrid cloud expansion</div>
                            </div>
                            <div class="tech-box opportunity">
                                ROKS (Managed OpenShift)
                                <div class="sub">💡 Kubernetes as a service</div>
                            </div>
                            <div class="tech-box opportunity">
                                Power Virtual Server
                                <div class="sub">💡 AIX/IBM i in cloud</div>
                            </div>
                            <div class="tech-box explore">
                                Cloud Satellite
                                <div class="sub">🔍 Distributed cloud</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Services Row -->
                <div class="layer-row services">
                    <div class="service-box tls">
                        IBM Technology Lifecycle Services (TLS)
                        <div style="font-size: 10px; margin-top: 8px; font-weight: normal;">
                            ✓ 24/7 support for critical systems | 💡 Expand to cloud services
                        </div>
                    </div>
                    <div class="service-box el">
                        IBM Expert Labs (EL)
                        <div style="font-size: 10px; margin-top: 8px; font-weight: normal;">
                            ✓ Strategic consulting | 💡 AI/Data modernization engagements
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar: IT Automation & Network Mgmt -->
            <div class="sidebar-right">
                <div class="sidebar-section automation">
                    <div class="section-header">IT Automation - Key Opportunities</div>
                    <div class="tech-item highlight">
                        <strong>Icetana (Instana)</strong>
                        <div style="font-size: 8px; margin-top: 3px; color: #0f62fe;">
                            ✓ APM deployed<br>
                            💡 Full-stack observability
                        </div>
                    </div>
                    <div class="tech-item highlight">
                        <strong>Kubecost</strong>
                        <div style="font-size: 8px; margin-top: 3px; color: #0f62fe;">
                            ✓ K8s cost optimization<br>
                            💡 FinOps expansion
                        </div>
                    </div>
                    <div class="tech-item opportunity">
                        Apptio (Cloudability)
                        <div style="font-size: 8px; margin-top: 3px;">
                            💡 Cloud financial management
                        </div>
                    </div>
                    <div class="tech-item opportunity">
                        Turbonomic
                        <div style="font-size: 8px; margin-top: 3px;">
                            💡 Application resource mgmt
                        </div>
                    </div>
                    <div class="tech-item explore">
                        Cloud Pak for AIOps
                        <div style="font-size: 8px; margin-top: 3px;">
                            🔍 AI-powered IT operations
                        </div>
                    </div>
                    <div class="tech-item highlight">
                        <strong>Ansible</strong>
                        <div style="font-size: 8px; margin-top: 3px; color: #0f62fe;">
                            ✓ Automation platform<br>
                            💡 Expand to network automation
                        </div>
                    </div>
                </div>

                <div class="sidebar-section network">
                    <div class="section-header">Network - Modernization Path</div>
                    <div class="tech-item opportunity">
                        NS1 Connect
                        <div style="font-size: 8px; margin-top: 3px;">
                            💡 DNS & traffic management
                        </div>
                    </div>
                    <div class="tech-item explore">
                        Cloud Network Security
                        <div style="font-size: 8px; margin-top: 3px;">
                            🔍 Zero-trust networking
                        </div>
                    </div>
                    <div class="tech-item no-interest">
                        SevOne
                        <div style="font-size: 8px; margin-top: 3px;">
                            ⚠️ Competitive pressure
                        </div>
                    </div>
                    <div class="tech-item explore">
                        HashiCorp Nomad
                        <div style="font-size: 8px; margin-top: 3px;">
                            🔍 Workload orchestration
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    matrix2.innerHTML = matrix2HTML;
}

// Print functionality
function printMatrix() {
    window.print();
}

// Export to image (optional enhancement)
function exportMatrixAsImage() {
    // Implementation for exporting matrix as image
    alert('Export functionality coming soon!');
}

// Made with Bob
