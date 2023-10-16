import express, { response } from 'express';
import passport from '../services/passport-steam';
import NodeCache from 'node-cache';

const steamCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour (3600 seconds)


const steam = express.Router()

steam.get('/steam/inventory/:steamId', async (req, res) => {
    const steamId = req.params.steamId;

    // Check if the inventory is cached
    const cachedInventory = steamCache.get(steamId);
    if (cachedInventory) {
        console.log('Inventory data retrieved from cache.');
        return res.status(200).json(cachedInventory);
    }

    // Fetch the inventory from Steam API https://csbackpack.net/api/inventory?steam_id=76561198203079379&language=english
    try {
        const response = await fetch(`https://csbackpack.net/api/inventory?steam_id=${steamId}&language=english`);
        const data = await response.json();

        // Cache the inventory data
        steamCache.set(steamId, data);

        console.log('Inventory data fetched and cached.');
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching Steam inventory:', error);
        return res.status(500).json({ error: 'Failed to fetch inventory' });
    }
});

export default steam