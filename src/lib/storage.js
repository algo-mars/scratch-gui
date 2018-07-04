import ScratchStorage from 'scratch-storage';

import defaultProjectAssets from './default-project';

const SCRATCH_API_PREFIX = '/api/v1/scratch';
const SCRATCH_ASSET_SERVER = 'https://cdn.assets.scratch.mit.edu';

/**
 * Wrapper for ScratchStorage which adds default web sources.
 * @todo make this more configurable
 */
class Storage extends ScratchStorage {
    constructor () {
        super();
        this.addWebSource(
            [this.AssetType.Project],
            projectAsset => {
                const [projectId, revision] = projectAsset.assetId.split('.');
                return `${SCRATCH_API_PREFIX}/load/${projectId}`;
            }
        );

        this.addWebSource(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            asset => `${SCRATCH_ASSET_SERVER}/internalapi/asset/${asset.assetId}.${asset.dataFormat}/get/`
        );

        this.addWebSource(
            [this.AssetType.ImageVector, this.AssetType.ImageBitmap, this.AssetType.Sound],
            asset => `${SCRATCH_API_PREFIX}/asset?name=${asset.assetId}.${asset.dataFormat}`
        );

        defaultProjectAssets.forEach(asset => this.cache(
            this.AssetType[asset.assetType],
            this.DataFormat[asset.dataFormat],
            asset.data,
            asset.id
        ));
    }
}

const storage = new Storage();

export default storage;
