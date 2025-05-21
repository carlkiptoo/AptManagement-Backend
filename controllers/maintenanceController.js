import MaintenanceRequest from "../models/MaintenanceRequest.js";

export const getRequestsByTenant = async (req, res) => {
    try {
        const tenantId = req.user.userId;
        console.log('Fetching requests for tenant:', tenantId);

        if (!tenantId) {
            console.log('No tenant ID provided');
            return res.status(400).json({message: 'Tenant ID required'});
        }

        const requests = await MaintenanceRequest.find({tenantId}).sort({createdAt: -1});
        console.log('Requests:', requests);

        res.status(200).json({message: 'Requests retrieved successfully', requests});
    } catch (error) {
        console.error('Error retrieving requests:', error);
        res.status(500).json({message: 'Error retrieving requests'});
    }
}