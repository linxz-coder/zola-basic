import { Task } from '../task';
export declare type Config = {
    host: string;
    apiKey?: string;
    clientAgents?: string[];
    headers?: Record<string, any>;
};
export declare type Pagination = {
    offset?: number;
    limit?: number;
};
export declare type ResourceQuery = Pagination & {};
export declare type ResourceResults<T> = Pagination & {
    results: T;
    total: number;
};
export declare type IndexOptions = {
    primaryKey?: string;
};
export declare type IndexObject = {
    uid: string;
    primaryKey?: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare type IndexesQuery = ResourceQuery & {};
export declare type IndexesResults<T> = ResourceResults<T> & {};
export declare const MatchingStrategies: {
    ALL: string;
    LAST: string;
};
export declare type MatchingStrategies = typeof MatchingStrategies[keyof typeof MatchingStrategies];
export declare type Filter = string | Array<string | string[]>;
export declare type Query = {
    q?: string | null;
};
export declare type Highlight = {
    attributesToHighlight?: string[];
    highlightPreTag?: string;
    highlightPostTag?: string;
};
export declare type Crop = {
    attributesToCrop?: string[];
    cropLength?: number;
    cropMarker?: string;
};
export declare type SearchParams = Query & Pagination & Highlight & Crop & {
    filter?: Filter;
    sort?: string[];
    facets?: string[];
    attributesToRetrieve?: string[];
    showMatchesPosition?: boolean;
    matchingStrategy?: MatchingStrategies;
    hitsPerPage?: number;
    page?: number;
};
export declare type SearchRequestGET = Pagination & Query & Omit<Highlight, 'attributesToHighlight'> & Omit<Crop, 'attributesToCrop'> & {
    filter?: string;
    sort?: string;
    facets?: string;
    attributesToRetrieve?: string;
    attributesToHighlight?: string;
    attributesToCrop?: string;
    showMatchesPosition?: boolean;
};
export declare type CategoriesDistribution = {
    [category: string]: number;
};
export declare type Facet = string;
export declare type FacetDistribution = Record<Facet, CategoriesDistribution>;
export declare type MatchesPosition<T> = Partial<Record<keyof T, Array<{
    start: number;
    length: number;
}>>>;
export declare type Hit<T = Record<string, any>> = T & {
    _formatted?: Partial<T>;
    _matchesPosition?: MatchesPosition<T>;
};
export declare type Hits<T = Record<string, any>> = Array<Hit<T>>;
export declare type SearchResponse<T = Record<string, any>> = {
    hits: Hits<T>;
    processingTimeMs: number;
    facetDistribution?: FacetDistribution;
    query: string;
    totalHits?: number;
    hitsPerPage?: number;
    page?: number;
    totalPages?: number;
    offset?: number;
    limit?: number;
    estimatedTotalHits?: number;
};
export declare type FieldDistribution = {
    [field: string]: number;
};
declare type Fields<T = Record<string, any>> = Array<Extract<keyof T, string>> | Extract<keyof T, string>;
export declare type DocumentOptions = {
    primaryKey?: string;
};
export declare type DocumentsQuery<T = Record<string, any>> = ResourceQuery & {
    fields?: Fields<T>;
};
export declare type DocumentQuery<T = Record<string, any>> = {
    fields?: Fields<T>;
};
export declare type Document<T = Record<string, any>> = T;
export declare type Documents<T = Record<string, any>> = Array<Document<T>>;
export declare type DocumentsResults<T = Record<string, any>> = ResourceResults<Documents<T>> & {};
export declare type FilterableAttributes = string[] | null;
export declare type DistinctAttribute = string | null;
export declare type SearchableAttributes = string[] | null;
export declare type SortableAttributes = string[] | null;
export declare type DisplayedAttributes = string[] | null;
export declare type RankingRules = string[] | null;
export declare type StopWords = string[] | null;
export declare type Synonyms = {
    [field: string]: string[];
} | null;
export declare type TypoTolerance = {
    enabled?: boolean | null;
    disableOnAttributes?: string[] | null;
    disableOnWords?: string[] | null;
    minWordSizeForTypos?: {
        oneTypo?: number | null;
        twoTypos?: number | null;
    };
} | null;
export declare type Faceting = {
    maxValuesPerFacet?: number | null;
};
export declare type PaginationSettings = {
    maxTotalHits?: number | null;
};
export declare type Settings = {
    filterableAttributes?: FilterableAttributes;
    distinctAttribute?: DistinctAttribute;
    sortableAttributes?: SortableAttributes;
    searchableAttributes?: SearchableAttributes;
    displayedAttributes?: DisplayedAttributes;
    rankingRules?: RankingRules;
    stopWords?: StopWords;
    synonyms?: Synonyms;
    typoTolerance?: TypoTolerance;
    faceting?: Faceting;
    pagination?: PaginationSettings;
};
export declare const enum TaskStatus {
    TASK_SUCCEEDED = "succeeded",
    TASK_PROCESSING = "processing",
    TASK_FAILED = "failed",
    TASK_ENQUEUED = "enqueued"
}
export declare const enum TaskTypes {
    INDEX_CREATION = "indexCreation",
    INDEX_UPDATE = "indexUpdate",
    INDEX_DELETION = "indexDeletion",
    DOCUMENTS_ADDITION_OR_UPDATE = "documentAdditionOrUpdate",
    DOCUMENT_DELETION = "documentDeletion",
    SETTINGS_UPDATE = "settingsUpdate",
    INDEXES_SWAP = "indexSwap",
    TASK_DELETION = "taskDeletion",
    SNAPSHOT_CREATION = "snapshotCreation",
    TASK_CANCELATION = "taskCancelation"
}
export declare type TasksQuery = {
    indexUids?: string[];
    uids?: number[];
    types?: TaskTypes[];
    statuses?: TaskStatus[];
    canceledBy?: number[];
    beforeEnqueuedAt?: Date;
    afterEnqueuedAt?: Date;
    beforeStartedAt?: Date;
    afterStartedAt?: Date;
    beforeFinishedAt?: Date;
    afterFinishedAt?: Date;
    limit?: number;
    from?: number;
};
export declare type CancelTasksQuery = Omit<TasksQuery, 'limit' | 'from'> & {};
export declare type DeleteTasksQuery = Omit<TasksQuery, 'limit' | 'from'> & {};
export declare type EnqueuedTaskObject = {
    taskUid: number;
    indexUid?: string;
    status: TaskStatus;
    type: TaskTypes;
    enqueuedAt: string;
    canceledBy: number;
};
export declare type TaskObject = Omit<EnqueuedTaskObject, 'taskUid'> & {
    uid: number;
    details: {
        receivedDocuments?: number;
        indexedDocuments?: number;
        deletedDocuments?: number;
        providedIds?: number;
        primaryKey?: string;
        rankingRules?: RankingRules;
        searchableAttributes?: SearchableAttributes;
        displayedAttributes?: DisplayedAttributes;
        filterableAttributes?: FilterableAttributes;
        sortableAttributes?: SortableAttributes;
        stopWords?: StopWords;
        synonyms?: Synonyms;
        distinctAttribute?: DistinctAttribute;
        swaps?: SwapIndexesParams;
        matchedTasks?: number;
        canceledTasks?: number;
        deletedTasks?: number;
        originalFilter?: string;
    };
    error: MeiliSearchErrorInfo | null;
    duration: string;
    startedAt: string;
    finishedAt: string;
};
export declare type SwapIndexesParams = Array<{
    indexes: string[];
}>;
declare type CursorResults<T> = {
    results: T[];
    limit: number;
    from: number;
    next: number;
};
export declare type TasksResults = CursorResults<Task>;
export declare type TasksResultsObject = CursorResults<TaskObject>;
export declare type WaitOptions = {
    timeOutMs?: number;
    intervalMs?: number;
};
export declare type Health = {
    status: 'available';
};
export declare type IndexStats = {
    numberOfDocuments: number;
    isIndexing: boolean;
    fieldDistribution: FieldDistribution;
};
export declare type Stats = {
    databaseSize: number;
    lastUpdate: string;
    indexes: {
        [index: string]: IndexStats;
    };
};
export declare type Key = {
    uid: string;
    description: string;
    name: string | null;
    key: string;
    actions: string[];
    indexes: string[];
    expiresAt: Date;
    createdAt: Date;
    updateAt: Date;
};
export declare type KeyCreation = {
    uid?: string;
    name?: string;
    description?: string;
    actions: string[];
    indexes: string[];
    expiresAt: Date | null;
};
export declare type KeyUpdate = {
    name?: string;
    description?: string;
};
export declare type KeysQuery = ResourceQuery & {};
export declare type KeysResults = ResourceResults<Key[]> & {};
export declare type Version = {
    commitSha: string;
    commitDate: string;
    pkgVersion: string;
};
export interface FetchError extends Error {
    type: string;
    errno: string;
    code: string;
}
export declare type MeiliSearchErrorInfo = {
    code: string;
    link: string;
    message: string;
    type: string;
};
export declare const enum ErrorStatusCode {
    /** @see https://docs.meilisearch.com/errors/#index_creation_failed */
    INDEX_CREATION_FAILED = "index_creation_failed",
    /** @see https://docs.meilisearch.com/errors/#index_already_exists */
    INDEX_ALREADY_EXISTS = "index_already_exists",
    /** @see https://docs.meilisearch.com/errors/#index_not_found */
    INDEX_NOT_FOUND = "index_not_found",
    /** @see https://docs.meilisearch.com/errors/#invalid_index_uid */
    INVALID_INDEX_UID = "invalid_index_uid",
    /** @see https://docs.meilisearch.com/errors/#index_not_accessible */
    INDEX_NOT_ACCESSIBLE = "index_not_accessible",
    /** @see https://docs.meilisearch.com/errors/#invalid_state */
    INVALID_STATE = "invalid_state",
    /** @see https://docs.meilisearch.com/errors/#primary_key_inference_failed */
    PRIMARY_KEY_INFERENCE_FAILED = "primary_key_inference_failed",
    /** @see https://docs.meilisearch.com/errors/#index_primary_key_already_exists */
    INDEX_PRIMARY_KEY_ALREADY_EXISTS = "index_primary_key_already_exists",
    /** @see https://docs.meilisearch.com/errors/#max_fields_limit_exceeded */
    DOCUMENTS_FIELDS_LIMIT_REACHED = "document_fields_limit_reached",
    /** @see https://docs.meilisearch.com/errors/#missing_document_id */
    MISSING_DOCUMENT_ID = "missing_document_id",
    /** @see https://docs.meilisearch.com/errors/#missing_document_id */
    INVALID_DOCUMENT_ID = "invalid_document_id",
    /** @see https://docs.meilisearch.com/errors/#invalid_content_type */
    INVALID_CONTENT_TYPE = "invalid_content_type",
    /** @see https://docs.meilisearch.com/errors/#missing_content_type */
    MISSING_CONTENT_TYPE = "missing_content_type",
    /** @see https://docs.meilisearch.com/errors/#payload_too_large */
    PAYLOAD_TOO_LARGE = "payload_too_large",
    /** @see https://docs.meilisearch.com/errors/#missing_payload */
    MISSING_PAYLOAD = "missing_payload",
    /** @see https://docs.meilisearch.com/errors/#malformed_payload */
    MALFORMED_PAYLOAD = "malformed_payload",
    /** @see https://docs.meilisearch.com/errors/#no_space_left_on_device */
    NO_SPACE_LEFT_ON_DEVICE = "no_space_left_on_device",
    /** @see https://docs.meilisearch.com/errors/#invalid_store_file */
    INVALID_STORE_FILE = "invalid_store_file",
    /** @see https://docs.meilisearch.com/errors/#invalid_ranking_rules */
    INVALID_RANKING_RULES = "missing_document_id",
    /** @see https://docs.meilisearch.com/errors/#invalid_request */
    INVALID_REQUEST = "invalid_request",
    /** @see https://docs.meilisearch.com/errors/#invalid_filter */
    INVALID_FILTER = "invalid_filter",
    /** @see https://docs.meilisearch.com/errors/#invalid_sort */
    INVALID_SORT = "invalid_sort",
    /** @see https://docs.meilisearch.com/errors/#invalid_geo_field */
    INVALID_GEO_FIELD = "invalid_geo_field",
    /** @see https://docs.meilisearch.com/errors/#bad_request */
    BAD_REQUEST = "bad_request",
    /** @see https://docs.meilisearch.com/errors/#document_not_found */
    DOCUMENT_NOT_FOUND = "document_not_found",
    /** @see https://docs.meilisearch.com/errors/#internal */
    INTERNAL = "internal",
    /** @see https://docs.meilisearch.com/errors/#invalid_api_key */
    INVALID_API_KEY = "invalid_api_key",
    /** @see https://docs.meilisearch.com/errors/#invalid_api_key_description */
    INVALID_API_KEY_DESCRIPTION = "invalid_api_key_description",
    /** @see https://docs.meilisearch.com/errors/#invalid_api_key_actions */
    INVALID_API_KEY_ACTIONS = "invalid_api_key_actions",
    /** @see https://docs.meilisearch.com/errors/#invalid_api_key_indexes */
    INVALID_API_KEY_INDEXES = "invalid_api_key_indexes",
    /** @see https://docs.meilisearch.com/errors/#invalid_api_key_expires_at */
    INVALID_API_KEY_EXPIRES_AT = "invalid_api_key_expires_at",
    /** @see https://docs.meilisearch.com/errors/#api_key_not_found */
    API_KEY_NOT_FOUND = "api_key_not_found",
    /** @see https://docs.meilisearch.com/errors/#missing_parameter */
    MISSING_PARAMETER = "missing_parameter",
    /** @see https://docs.meilisearch.com/errors/#missing_authorization_header */
    MISSING_AUTHORIZATION_HEADER = "missing_authorization_header",
    /** @see https://docs.meilisearch.com/errors/#unretrievable_document */
    UNRETRIEVABLE_DOCUMENT = "unretrievable_document",
    /** @see https://docs.meilisearch.com/errors/#database_size_limit_reached */
    MAX_DATABASE_SIZE_LIMIT_REACHED = "database_size_limit_reached",
    /** @see https://docs.meilisearch.com/errors/#task_not_found */
    TASK_NOT_FOUND = "task_not_found",
    /** @see https://docs.meilisearch.com/errors/#dump_process_failed */
    DUMP_PROCESS_FAILED = "dump_process_failed",
    /** @see https://docs.meilisearch.com/errors/#dump_not_found */
    DUMP_NOT_FOUND = "dump_not_found",
    /** @see https://docs.meilisearch.com/errors/#duplicate_index_found */
    DUPLICATE_INDEX_FOUND = "duplicate_index_found",
    /** @see https://docs.meilisearch.com/errors/#missing_master_key */
    MISSING_MASTER_KEY = "missing_master_key",
    /** @see http://docs.meilisearch.com/errors/#invalid_task_types_filter */
    INVALID_TASK_TYPES_FILTER = "invalid_task_types_filter",
    /** @see http://docs.meilisearch.com/errors/#invalid_task_statuses_filter */
    INVALID_TASK_STATUSES_FILTER = "invalid_task_statuses_filter",
    /** @see http://docs.meilisearch.com/errors/#invalid_task_canceled_by_filter */
    INVALID_TASK_CANCELED_BY_FILTER = "invalid_task_canceled_by_filter",
    /** @see http://docs.meilisearch.com/errors/#invalid_task_uids_filter */
    INVALID_TASK_UIDS_FILTER = "invalid_task_uids_filter",
    /** @see http://docs.meilisearch.com/errors/#invalid_task_date_filter */
    INVALID_TASK_DATE_FILTER = "invalid_task_date_filter",
    /** @see http://docs.meilisearch.com/errors/#missing_task_filters */
    MISSING_TASK_FILTERS = "missing_task_filters"
}
export declare type TokenIndexRules = {
    [field: string]: any;
    filter?: Filter;
};
export declare type TokenSearchRules = Record<string, TokenIndexRules | null> | string[];
export declare type TokenOptions = {
    apiKey?: string;
    expiresAt?: Date;
};
export {};
//# sourceMappingURL=types.d.ts.map